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
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-page-de-connexion',
  templateUrl: './page-de-connexion.component.html',
  styleUrls: ['./page-de-connexion.component.css'],
})
export class PageDeConnexionComponent implements OnInit {
  resetForm: FormGroup;
  z: boolean;
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
    private router: Router
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
    this.TempMdp = localStorage.getItem('premCo');

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
    var mdp1 = this.resetForm.value.code1;
    var mdp2 = this.resetForm.value.code2;

    this.userConnect = localStorage.getItem('logFirst');
    if (this.resetForm.value.code1.lenght < 8) {
    }
    if (mdp1 === mdp2) {
      let body = { mdpOublie: this.resetForm.value.code1 };
      this.httpClient
        .put<Utilisateur>(
          environment.urlFinal + 'efacture/mdpUpdate/' + this.userConnect,
          body
        )
        .subscribe((newUser) => {
          if (newUser) {
            let body = { password2: 'ok' };
            this.httpClient
              .put<Utilisateur>(
                environment.urlFinal + 'efacture/pwd1/' + this.userConnect,
                body
              )
              .subscribe((newUser) => {});
          }
        });
      localStorage.removeItem('mdpfirst');
      localStorage.removeItem('loginfirst');

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
