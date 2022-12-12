import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'src/app/ForceMdp';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { AuthService } from 'src/app/Services/auth.service';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';
import { FactureService } from 'src/app/Services/facture.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  detailForm: FormGroup;
  UserInfos: any;
  mdpForm: FormGroup;
  racine: any;
  nomPrenom: any;
  tel: any;
  login: any;
  pwd: any;
  emptyField: boolean;
  mdp: boolean;
  duo: boolean;
  compteuserObj = new Utilisateur();
  pwdactu: any;
  mdpdecrypt : any;
  constructor(
    private factureService: FactureService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    public autoLogoutService: AutoLogoutService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.autoLogoutService.infoUser(localStorage.getItem('login')).subscribe(
      (res) => {
        if (res != null) {
          this.mdpForm = this.fb.group({
            mdpActu: ['', [Validators.required]],
            mdp1: [
              '',
              [Validators.required, Password, Validators.minLength(8)],
            ],
            mdp2: [
              '',
              [Validators.required, Password, Validators.minLength(8)],
            ],
          });

          this.detailForm = this.fb.group({
            login: '',
            pwd: '',
          });

          this.UserDetail();
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

  get f(): { [key: string]: AbstractControl } {
    return this.detailForm.controls;
  }

  UserDetail() {
    this.httpClient
      .get(
        environment.urlFinal +
          'efacture/detailUser/' +
          localStorage.getItem('login')
      )
      .subscribe(
        (infosUser) => {
          this.UserInfos = infosUser;
          this.pwdactu = this.UserInfos.password1;

          this.nomPrenom = this.UserInfos.nom + ' ' + this.UserInfos.prenom;
          this.racine = this.UserInfos.login;
          this.tel = this.UserInfos.tel;
          this.login = this.UserInfos.login;
          this.pwd = this.UserInfos.password;
          this.authService.decriptPwd(this.login).subscribe((retour : string)=>{
            this.mdpdecrypt = retour
          })
        },
        (err) => {
          this.autoLogoutService.autoLogout(err.status, this.router);
        }
      );
  }

  ChangeMdp() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    if (
      this.mdpForm.value.mdpActu === '' &&
      this.mdpForm.value.mdp1 === '' &&
      this.mdpForm.value.mdp2 === ''
    ) {
      this.emptyField = true;
      swalWithBootstrapButtons.fire(
        'Attention',
        'Veuillez remplir les champs',
        'warning'
      );
    } else {
      if (
        this.mdpForm.value.mdpActu ===
        localStorage.getItem('confirmationTransation')
      ) {
        this.compteuserObj.login = this.login;
        this.compteuserObj.password = this.mdpdecrypt;
        this.compteuserObj.password1 = this.mdpForm.value.mdp1;
        if (this.mdpForm.value.mdp1 === this.mdpForm.value.mdp2) {
          this.authService.firstconnexion(this.compteuserObj).subscribe(
            (newUser) => {
              if (newUser) {
                swalWithBootstrapButtons.fire(
                  'Réussie',
                  'Mot de passe modifié avec succès',
                  'success'
                );
              }
              this.ngOnInit();
              this.router.navigate(['logout']);
            },
            (err) => {
              this.autoLogoutService.autoLogout(err.status, this.router);
            }
          );
        } else {
          this.duo = true;
          this.mdp = false;
        }
      } else {
        this.mdp = true;
      }
    }
  }
}
