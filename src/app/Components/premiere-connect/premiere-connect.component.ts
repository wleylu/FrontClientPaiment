import { Login } from './../../model/login.model';
import { User_login } from 'src/app/model/user_login.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { Injectable } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HomeComponent } from '../home/home.component';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FactureService } from 'src/app/Services/facture.service';
import { Utilisateur } from 'src/app/model/utilisateur.model';

@Component({
  selector: 'app-premiere-connect',
  templateUrl: './premiere-connect.component.html',
  styleUrls: ['./premiere-connect.component.css'],
})
export class PremiereConnectComponent implements OnInit {
  formValue: FormGroup;
  user = new Utilisateur();
  erreurAuth!: number;
  erreur: boolean;
  falseLogin: boolean;
  blockUser: boolean;
  invalidLogin = false;
  mdpDecrypt : string;
  constructor(
    private authService: AuthService,
    private formbuilber: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formValue = this.formbuilber.group({
      login: [''],
      password: [''],
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onLoggedin() {
    if (
      this.formValue.value.login === '' ||
      this.formValue.value.password === ''
    ) {
      this.erreur = true;
    } else {
      this.authService
        .login(this.formValue.value.login, this.formValue.value.password)
        .subscribe(
          (res) => {
            let mdp : string;
            let formpwd : string;
            formpwd = this.formValue.value.password;
            if(res){
              this.authService.decriptPwd(this.formValue.value.login).subscribe((retour : string)=>{
                console.log(retour);
                this.mdpDecrypt = retour;
                mdp = retour;
                localStorage.setItem('premCo', this.mdpDecrypt);
                if(retour === formpwd){
                  if (
                    //res != null &&
                    res.habilitation == 'ROLE_USER_PERSO' ||
                      res.habilitation == 'ROLE_USER_COM'
                  ) {
                    if (res.status == 1 && res.validation == 1 && res.bloquser == 0) {
                      this.router.navigate(['firstConnexion']);
                    } else {
                      this.falseLogin = false;
                      this.blockUser = true;
                      Toast.fire({
                        icon: 'Erreur',
                        title:
                          "Compte non Activé , Veuillez contacter l'administrateur de la plateforme",
                      });
                    }
                  } else {
                    this.erreurAuth = 2;

                    //window.location.reload();
                  }
                }else{
                  this.erreurAuth = 1;

                }

                console.log(this.mdpDecrypt + typeof this.mdpDecrypt + this.formValue.value.password + typeof this.formValue.value.password)

              })
            }
            console.log(JSON.stringify(res))

            localStorage.setItem('logFirst', res.login);

          },
          (err) => {
            this.falseLogin = true;
            this.blockUser = false;
            Toast.fire({
              icon: 'error',
              title: 'Identifiants incorrects',
            });
          }
        );
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      icon: 'center',
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }
}
