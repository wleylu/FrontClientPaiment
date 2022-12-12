import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { AuthService } from 'src/app/Services/auth.service';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Password } from '../../ForceMdp';
import { ForgotPwdComponent } from '../forgot-pwd/forgot-pwd.component';

@Component({
  selector: 'app-reset-screen',
  templateUrl: './reset-screen.component.html',
  styleUrls: ['./reset-screen.component.css'],
})
export class ResetScreenComponent implements OnInit {
  resetForm: FormGroup;
  z: boolean;
  compteuserObj = new Utilisateur();
  activeField: boolean;
  disableField: boolean;
  verif: boolean;
  errorAlert: boolean;
  errorAlert1: boolean;
  field1: boolean = true;
  code = '';
  code1 = '';
  code2 = '';
  submitVerif: boolean = true;
  submitted = false;
  TempMdp: any;
  userConnect: any;
  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    public autoLogoutService: AutoLogoutService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      code: ['', [Validators.required]],
      code1: ['', [Validators.required, Password, Validators.minLength(8)]],
      code2: ['', [Validators.required, Password, Validators.minLength(8)]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  CheckMdp() {
    this.TempMdp = localStorage.getItem('temporaireMdp');

    if (this.resetForm.value.code === this.TempMdp) {
      this.activeField = true;
      this.disableField = true;
      this.errorAlert = false;
      this.field1 = false;
      this.submitVerif = false;
    } else {
      this.errorAlert = true;
      this.activeField = false;
      this.field1 = true;
      this.submitVerif = true;
    }
  }

  ChangeMdp() {
    this.userConnect = localStorage.getItem('userConnect');
    if (this.resetForm.value.code1.lenght < 8) {
    }
    if (this.resetForm.value.code1 === this.resetForm.value.code2) {
      this.compteuserObj.login = this.userConnect;
      this.compteuserObj.password1 = this.resetForm.value.code1;
      let body = { mdpOublie: this.resetForm.value.code1 };
      this.authService.firstconnexion(this.compteuserObj).subscribe(
        (newUser) => {
          if (newUser) {
            let body = { mdpOublie: '' };
            this.httpClient
              .put<Utilisateur>(
                environment.urlFinal +
                  'efacture/user/mdpOublie/' +
                  this.userConnect,
                body
              )
              .subscribe((newUser) => {});
          }
        },
        (err) => {
          this.autoLogoutService.autoLogout(err.status, this.router);
        }
      );

      Swal.fire({
        title: 'Mot de passe modifié avec succès',
        text: 'Utilisez le nouveau mot de passe pour votre prochaine connexion',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['connexion']);
        }
      });
    } else {
      this.errorAlert1 = true;
    }
  }

  tailleMdp() {
    if (this.resetForm.value.code1.lenght < 8) {
      this.z = true;
    }
  }
}
