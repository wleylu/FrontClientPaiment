import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AddReclamation } from './../../model/Addreclamation.model';
import { FactureService } from './../../Services/facture.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reclamations } from './../../model/reclamation.model';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css'],
})
export class ReclamationsComponent implements OnInit {
  reclamAdd: Reclamations;
  mailEnvoyeur: any;
  reclamEdit: FormGroup;
  MailEnvoi: FormGroup;
  compteS: any;
  AllFacturier: any;
  facturiers: any;
  ListeFacturier: any;
  username: string;
  client: string;
  contact: string;
  mail: boolean;
  ErrorForm: FormGroup;
  mail1: boolean = true;
  all: any;
  stringCompte: any;
  objCompte: any;
  f: [];
  // facturier = '';
  // reference = '';
  // message = '';
  // numCpt = '';

  constructor(
    public reclam: AuthService,
    private fb: FormBuilder,
    private factureService: FactureService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public autoLogoutService: AutoLogoutService
  ) {
    this.reclamAdd = new Reclamations();
    this.compteS = this.getComptes();
    this.facturiers = this.GetFacturier();
  }

  ngOnInit(): void {
    this.reclamEdit = this.fb.group({
      client: [''],
      facturier: [''],
      numCpt: [''],
      reference: [''],
      message: ['',Validators.required],
    });
    this.autoLogoutService.infoUser(localStorage.getItem('login')).subscribe(
      (res) => {
        if (res != null) {
          this.getComptes();
          this.client = sessionStorage.getItem('client');
          this.username = localStorage.getItem('nomPrenom');
          this.contact = localStorage.getItem('contact');

          this.GetFacturier();


          var f = this.reclamEdit.value.reference;
        } else {
          this.autoLogoutService.Logout(this.router);
          this.router.navigate(['/connexion'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }
      },
      (err) => {
        this.autoLogoutService.Logout(this.router);
        this.router.navigate(['/connexion'], {
          queryParams: { returnUrl: this.router.routerState.snapshot.url },
        });
      }
    );
  }

  Envoyeur() {
    this.httpClient.get(environment.urlFinal + 'efacture/emails').subscribe(
      (mails: any) => {},
      (err) => {
        this.autoLogoutService.autoLogout(err.status, this.router);
      }
    );
  }
  getComptes() {
    this.httpClient
      .get(
        environment.urlFinal +
          'efacture/cm/admin/marchand/' +
          sessionStorage.getItem('client')
      )
      .subscribe(
        (res: any) => {
          this.all = res;
          var i;

          this.stringCompte = JSON.stringify(this.all.comptes);

          this.objCompte = JSON.parse(this.stringCompte);
          for (i in this.objCompte) {
            this.f = this.objCompte[i].compte;
          }
        },
        (err) => {
          this.autoLogoutService.autoLogout(err.status, this.router);
        }
      );
    return this.objCompte;
  }
  Reclamations() {
    this.reclamAdd.facturier = this.reclamEdit.value.facturier;
    this.reclamAdd.numCpt = this.reclamEdit.value.numCpt;
    this.reclamAdd.message = this.reclamEdit.value.message;
    this.reclamAdd.reference = this.reclamEdit.value.reference;
    this.reclamAdd.telephone = this.reclamEdit.value.contact;
    this.reclamAdd.motif = this.reclamEdit.value.message;
    this.reclamAdd.login = localStorage.getItem('login');
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

  GetFacturier() {
    this.httpClient
      .get<any>(environment.urlFinal + 'efacture/facturier/Allfacturier')
      .subscribe(
        (ListeFacturier) => {
          this.AllFacturier = ListeFacturier;
        },
        (error) => {
          this.ErrorForm = this.fb.group({
            httpStatusCode: error.status,
            methode: 'GetFacturier',
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

  onSubmit() {
    //alert( this.facturier +
    // this.reference +
    // this.message+
    // this.numCpt)

    if(this.reclamEdit.value.message == '' || this.reclamEdit.value.message == null){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-2',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire(
            'Attention',
            'Veuillez remplir les champs',
            'warning'
          );
    }else{
console.log(this.reclamEdit.value)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    //alert(this.reclamEdit)
    // if (
    //   this.message === ''
    // ) {
    //   swalWithBootstrapButtons.fire(
    //     'Attention',
    //     'Veuillez remplir les champs',
    //     'warning'
    //   );
    // } else {
      this.mail = true;
      this.mail1 = false;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        icon: 'center',
        showConfirmationButton: false,
        timer: 2300,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Envoi du mail en cours !',
      });

      this.EnvoiReclamation();
    }
    }
  // }

  EnvoiReclamation() {
    this.mail = true;
    this.MailEnvoi = this.fb.group({
     // expediteur: localStorage.getItem('expediteur'),
      destinataire: 'raouf.kone@banqueatlantique.net',
      objet: 'RECLAMATION' + ' ' + this.reclamEdit.value.reference,
      message:
        'Bonjour chers distributeur, Veuillez lire ci-dessous la réclamation du client :' +
        this.client +
        '\n' +
        this.reclamEdit.value.message +
        '\n' +
        'Merci de traiter cette réclamation' +
        '\n' +
        'FACTURIER : ' +
        this.reclamEdit.value.facturier +
        '\n' +
        'REFERENCE TRANSACTION : ' +
        this.reclamEdit.value.reference +
        '\n' +
        'RACINE CLIENT : ' +
        this.client,
    });

    this.factureService.EnvoiMail(this.MailEnvoi.value).subscribe(
      (data) => {
        if (data) {
          this.Reclamations();
          this.ClientMail();
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success ml-2',
              cancelButton: 'btn btn-danger',
            },
            buttonsStyling: false,
          });
          swalWithBootstrapButtons.fire(
            'Succès',
            'Réclamation envoyée avec succès',
            'success'
          );
          this.router.navigate(['/home']);
        }
        this.factureService.GetAll().subscribe((response) => {
          this.factureService.list = response;
        });
      },
      (error) => {
        this.ErrorForm = this.fb.group({
          httpStatusCode: error.status,
          methode: 'EnvoiReclamation',
          login: localStorage.getItem('client'),
          message: JSON.stringify(error.name),
          description:
            JSON.stringify(error.message) + '\n' + JSON.stringify(error.error),
        });
        this.factureService
          .Envoierror(this.ErrorForm.value)
          .subscribe((res) => {});

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success ml-2',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire(
          'Erreur',
          'Réclamation non envoyée',
          'error'
        );
        this.autoLogoutService.autoLogout(error.status, this.router);
        this.router.navigate(['/home']);
        this.mail = false;
      }
    );
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  ClientMail() {
    this.MailEnvoi = this.fb.group({
     // expediteur: localStorage.getItem('expediteur'),
      destinataire: localStorage.getItem('email'),
      objet: 'RECLAMATION' + ' ' + this.reclamEdit.value.reference,
      message:
        'Bonjour chers client, Vous avez porté une réclamation:' +
        '\n' +
        this.reclamEdit.value.message +
        '\n' +
        'Merci de patienter votre réclamation sera prise en compte' +
        '\n' +
        'FACTURIER : ' +
        this.reclamEdit.value.facturier +
        '\n' +
        'REFERENCE TRANSACTION : ' +
        this.reclamEdit.value.reference +
        '\n' +
        'RACINE CLIENT : ' +
        this.client,
    });

    this.factureService.EnvoiMail(this.MailEnvoi.value).subscribe(
      (data) => {
        if (data) {
          this.Reclamations();
        }
        this.factureService.GetAll().subscribe((response) => {
          this.factureService.list = response;
        });
      },
      (error) => {
        this.ErrorForm = this.fb.group({
          httpStatusCode: error.status,
          methode: 'EnvoiReclamation',
          login: localStorage.getItem('client'),
          message: JSON.stringify(error.name),
          description:
            JSON.stringify(error.message) + '\n' + JSON.stringify(error.error),
        });
        this.factureService
          .Envoierror(this.ErrorForm.value)
          .subscribe((res) => {});

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success ml-2',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });

        this.autoLogoutService.autoLogout(error.status, this.router);
      }
    );
  }
}
