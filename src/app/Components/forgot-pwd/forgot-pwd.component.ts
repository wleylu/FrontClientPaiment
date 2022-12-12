import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isEmpty } from 'rxjs/operators';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FactureService } from 'src/app/Services/facture.service';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';
import { Reclamations } from 'src/app/model/reclamation.model';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css'],
})
export class ForgotPwdComponent implements OnInit {
  reclamAdd: Reclamations;
  mdpForm: FormGroup;
  MailEnvoi: FormGroup;
  closeResult: string;
  verifEmail: boolean;
  submitted = false;
  mdpGen: any;
  login: any;
  ErrorForm: FormGroup;
  m: boolean;
  email = '';
  user: any;
  mailEnvoyeur: any;
  Email: any;
  tel: any;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private factureService: FactureService,
    public autoLogoutService: AutoLogoutService
  ) {
    this.reclamAdd = new Reclamations();
  }

  ngOnInit(): void {
    this.mdpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  Envoyeur() {
    this.httpClient
      .get(environment.urlFinal + 'efacture/mails/emails')
      .subscribe((mails: any) => {});
  }
  openConfirm(modalConfirm) {
    this.modalService
      .open(modalConfirm, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.mdpForm.controls;
  }

  CheckEmail() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      icon: 'center',
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'warning',
      title: "Demande en cours d'envoi",
    });
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    var s = this.mdpForm.value.email;
    if (s === null || s === '') {
      this.m = true;
    } else {
      this.m = false;
      this.submitted = true;
     // alert(this.mdpForm.value.email)
      this.httpClient
        .get<any>(
          environment.urlFinal +
            'efacture/rechercheUserEmail/' +
            this.mdpForm.value.email
        )
        .subscribe(
          (findEMail) => {
            console.log(JSON.stringify(findEMail));

            if (findEMail == null || findEMail == 'null') {
              Swal.fire({
                title: 'DEMANDE DE REINITIALISATION DE MOTS DE PASSE',
                html: '<center>Adresse Email inexistante. \n Merci de réessayer !</center>',
                icon: 'error',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              this.verifEmail = true;
            } else {
              this.Email = findEMail.email;
              this.tel = findEMail.tel;
              this.user = findEMail.prenom;
              this.verifEmail = false;
              this.login = findEMail.login;
              localStorage.setItem('userConnect', this.login);

              this.SendMail();
            }
          },
          (error) => {
            window.location.reload();
            this.ErrorForm = this.fb.group({
              httpStatusCode: '405',
              methode: 'CheckEmail',
              login: localStorage.getItem('client'),
              message: JSON.stringify(error.name),
              description:
                JSON.stringify(error.message) +
                '\n' +
                JSON.stringify(error.error),
            });
            this.factureService
              .Envoierror(this.ErrorForm.value)
              .subscribe((res) => {});
            this.autoLogoutService.autoLogout(error.status, this.router);
          }
        );
    }
  }

  GenererMdp() {
    this.httpClient
      .get<any>(environment.urlFinal + 'efacture/user/mdp/generer')
      .subscribe(
        (TempMdp) => {
          if (TempMdp.code) {
            localStorage.setItem('temporaireMdp', TempMdp.code);

            let body = { mdpOublie: TempMdp.code };
            this.httpClient
              .put<Utilisateur>(
                environment.urlFinal + 'efacture/user/mdpOublie/' + this.login,
                body
              )
              .subscribe(
                (newUser) => {
                  localStorage.setItem('oldname', this.user);
                },
                (error) => {
                  window.location.reload();
                  this.ErrorForm = this.fb.group({
                    httpStatusCode: '404',
                    methode: 'GenererMdp',
                    login: localStorage.getItem('client'),
                    message: JSON.stringify(error.name),
                    description:
                      JSON.stringify(error.message) +
                      '\n' +
                      JSON.stringify(error.error),
                  });
                  this.factureService
                    .Envoierror(this.ErrorForm.value)
                    .subscribe((res) => {});
                  this.autoLogoutService.autoLogout(error.status, this.router);
                }
              );
            this.SendMail();
          }
        },
        (error) => {
          this.ErrorForm = this.fb.group({
            httpStatusCode: '404',
            methode: 'GenererMdp',
            login: localStorage.getItem('client'),
            message: JSON.stringify(error.name),
            description:
              JSON.stringify(error.message) +
              '\n' +
              JSON.stringify(error.error),
          });
          this.factureService
            .Envoierror(this.ErrorForm.value)
            .subscribe((res) => {});
          this.autoLogoutService.autoLogout(error.status, this.router);
          window.location.reload();
        }
      );
  }

  SendMail() {
    var mdp = localStorage.getItem('temporaireMdp');
    this.MailEnvoi = this.fb.group({
     // expediteur: localStorage.getItem('expediteur'),
      destinataire: 'raouf.kone@banqueatlantique.net',

      objet:
        'REINITIALISATION DE MOT DE PASSE COMPTE EFACTURE' + ' ' + this.login,
      message:
        'Bonjour Administrateur' +
        '\n' +
        'Ce compte demande la réinitialisation de son mot de passe' +
        '\n' +
        'Racine Client :.' +
        this.login +
        ' ' +
        '\n' +
        'Adresse email : ' +
        this.Email +
        '\n' +
        'Contact : ' +
        this.tel +
        '\n' +
        'Merci de prendre en compte cette demande après toutes vérifications !',
    });

    this.factureService.EnvoiMail(this.MailEnvoi.value).subscribe((data) => {
      this.factureService.GetAll().subscribe(
        (response) => {
          this.factureService.list = response;
          if (response) {
            Swal.fire({
              title: 'DEMANDE DE REINITIALISATION DE MOTS DE PASSE',
              html: '<center>Nous avons reçu votre demande de réinitialisation de mots de passe<br> Votre demande sera traitée après vérification. Merci !</center>',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['connexion']);
              }
            });

            this.Reclamations();
          }
        },
        (error) => {
          this.ErrorForm = this.fb.group({
            httpStatusCode: '403',
            methode: 'SendMail',
            login: localStorage.getItem('client'),
            message: JSON.stringify(error.name),
            description:
              JSON.stringify(error.message) +
              '\n' +
              JSON.stringify(error.error),
          });
          this.factureService
            .Envoierror(this.ErrorForm.value)
            .subscribe((res) => {});
          this.autoLogoutService.autoLogout(error.status, this.router);
        }
      );
    });

    this.MailEnvoi = this.fb.group({
     // expediteur: localStorage.getItem('expediteur'),
      destinataire: this.Email,
      objet:
        'REINITIALISATION DE MOT DE PASSE COMPTE EFACTURE' + ' ' + this.login,
      message:
        'Bonjour chers client' +
        '\n' +
        'Vous avez demandé la réinitialisation de votre mot de passe' +
        '\n' +
        'Racine Client :.' +
        this.login +
        ' ' +
        '\n' +
        'Adresse email : ' +
        this.Email +
        '\n' +
        'Contact : ' +
        this.tel +
        '\n' +
        'Merci de patienter votre demande sera traitée après toutes vérifications !' +
        'Ignorez cet e-mail si vous vous souvenez de votre mot de passe, ' +
        "ou vous n'avez pas fait la demande.",
    });

    this.factureService.EnvoiMail(this.MailEnvoi.value).subscribe((data) => {
      this.factureService.GetAll().subscribe(
        (response) => {
          this.factureService.list = response;
          if (response) {
          }
        },
        (error) => {
          this.ErrorForm = this.fb.group({
            httpStatusCode: '403',
            methode: 'SendMail',
            login: localStorage.getItem('client'),
            message: JSON.stringify(error.name),
            description:
              JSON.stringify(error.message) +
              '\n' +
              JSON.stringify(error.error),
          });
          this.factureService
            .Envoierror(this.ErrorForm.value)
            .subscribe((res) => {});
          this.autoLogoutService.autoLogout(error.status, this.router);
        }
      );
    });
  }

  Reclamations() {
    this.reclamAdd.facturier = 'N/A';
    this.reclamAdd.numCpt = 'N/A';
    this.reclamAdd.message = 'Mot de passe oublié';
    this.reclamAdd.reference = 'N/A';
    this.reclamAdd.telephone = this.tel;
    this.reclamAdd.motif = 'DEMANDE DE REINITIALISATION DE MOTS DE PASSE';
    this.reclamAdd.login = this.login;
    this.reclamAdd.nom = localStorage.getItem('nom');
    this.reclamAdd.prenom = localStorage.getItem('prenom');

    this.factureService.AddReclamation(this.reclamAdd).subscribe(
      (reclamation: Reclamations) => {},
      (error) => {
        this.ErrorForm = this.fb.group({
          httpStatusCode: '408',
          methode: 'Reclamations',
          login: localStorage.getItem('client'),
          message: JSON.stringify(error.name),
          description:
            JSON.stringify(error.message) + '\n' + JSON.stringify(error.error),
        });
        this.factureService
          .Envoierror(this.ErrorForm.value)
          .subscribe((res) => {});
        this.autoLogoutService.autoLogout(error.status, this.router);
      }
    );
  }
}
