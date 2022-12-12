import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'src/app/ForceMdp';
import { User } from 'src/app/model/user.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-firstconnexion',
  templateUrl: './firstconnexion.component.html',
  styleUrls: ['./firstconnexion.component.css'],
})
export class FirstconnexionComponent implements OnInit {
  firstConnexionForm!: FormGroup;
  password = '';
  password1 = '';
  password2 = '';
  submitted: boolean = false;
  user = new Utilisateur();
  compteuserObj = new Utilisateur();
  erreur = 0;
  z: boolean;
  errorAlert: boolean;
  errorAlert1: boolean;
  confirmErreur!: number;
  loginUser: any = localStorage.getItem('login');
  constructor(
    private authService: AuthService,
    private formbuilber: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firstConnexionForm = this.formbuilber.group({
      password: ['', Validators.required],
      password1: ['', [Validators.required, Password, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, Password, Validators.minLength(8)],
      ],
    });
    this.loginUser = localStorage.getItem('logFirst');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.firstConnexionForm.controls;
  }
  isControle(controlName: string, validationType: string) {
    const control = this.firstConnexionForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  tailleMdp() {
    if (this.firstConnexionForm.value.password1.lenght < 8) {
      this.z = true;
    }
  }

  onLoggedin() {
    console.log(localStorage.getItem('login'));
    console.log(this.firstConnexionForm.value.password1);
    const controls = this.firstConnexionForm.controls;
    if (this.firstConnexionForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    if (
      this.firstConnexionForm.value.password1 != null &&
      this.firstConnexionForm.value.password1 != ''
    ) {
      console.log('ok');
    console.log( this.firstConnexionForm.value.password1);
    console.log('ok');
      if (
        this.firstConnexionForm.value.password1 ===
        this.firstConnexionForm.value.confirmPassword
      ) {
        this.compteuserObj.login = this.loginUser;
        this.compteuserObj.password = this.firstConnexionForm.value.password;
        this.compteuserObj.password1 = this.firstConnexionForm.value.password1;
        console.log('ok000');
        console.log( this.compteuserObj.login);
        console.log('ok000');
        console.log('ok00');
        console.log( this.firstConnexionForm.value.password1);
        console.log('ok00');
        console.log('ok1');
        console.log( this.firstConnexionForm.value.password);
        console.log('ok1');
        console.log('ok2');
        console.log( this.firstConnexionForm.value.confirmPassword);
        console.log('ok2');
        if (
          this.firstConnexionForm.value.password ===
          localStorage.getItem('premCo')
        ) {
          console.log('ok3');
          console.log(localStorage.getItem('premCo'));
          console.log('ok3');
          this.authService.firstconnexion(this.compteuserObj).subscribe(
            (res) => {
              if (res.password !== res.password1) {
                this.router.navigate(['/connexion']);
              } else {
                this.confirmErreur = 5;
              }
            },
            (err) => {
              this.router.navigate(['/firstConnexion']);
              //alert("une erreure c'est produite1");
            }
          );
        } else {
          this.confirmErreur = 4;
        }
        localStorage.removeItem('isAuth');
        localStorage.removeItem('bloquser');
        localStorage.removeItem('client');
        localStorage.removeItem('dateCreation');
        localStorage.removeItem('email');
        localStorage.removeItem('habilitation');
        localStorage.removeItem('login');
        localStorage.removeItem('nom');
        localStorage.removeItem('password');
        localStorage.removeItem('password1');
        localStorage.removeItem('password2');
        localStorage.removeItem('prenom');
        localStorage.removeItem('status');
        localStorage.removeItem('tel');
        localStorage.removeItem('typePlanfond');
        localStorage.removeItem('validation');
      } else {
       // alert('erreur');
        this.errorAlert1 = true;
        this.confirmErreur = 1;
      }
    } else {
      this.confirmErreur = 2;
    }
  }
}
