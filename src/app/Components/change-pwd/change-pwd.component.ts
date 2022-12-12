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
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css'],
})
export class ChangePwdComponent implements OnInit {
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
  loginUser: any = localStorage.getItem('tentativeLogin');
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
    this.loginUser = localStorage.getItem('tentativeLogin');
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
  console.log('ok')
    console.log(this.loginUser);
    console.log('ok')
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
      console.log('ok1')
      console.log(this.firstConnexionForm.value.password1);
      console.log('ok1')
      if (
        this.firstConnexionForm.value.password1 ===
        this.firstConnexionForm.value.confirmPassword
      ) {

        console.log('ok2')
        console.log(this.firstConnexionForm.value.confirmPassword);
        console.log('ok2')
        this.authService.decriptPwd(this.loginUser).subscribe(mdp=>{
          console.log('ok222')
          console.log(mdp);
          console.log('ok222')
          this.compteuserObj.login = this.loginUser;
          this.compteuserObj.password = mdp
          this.compteuserObj.password1 = this.firstConnexionForm.value.password1;
          if (
            this.firstConnexionForm.value.password ===
            localStorage.getItem('confirmationTransation')
          ) {
            console.log('ok3')
            console.log(this.firstConnexionForm.value.confirmPassword);
            console.log('ok3')
            console.log('ok4')
            console.log(this.compteuserObj.login);
            console.log('ok4')
            console.log('ok5')
            console.log(this.compteuserObj.password);
            console.log('ok5')
            console.log('ok6')
            console.log(this.compteuserObj.password1);
            console.log('ok6')
            console.log('ok7')
            console.log(localStorage.getItem('confirmationTransation'));
            console.log('ok7')
            console.log(this.compteuserObj);
            this.authService.firstconnexion(this.compteuserObj).subscribe(
              (res) => {
                if (res.password !== res.password1) {

                  this.router.navigate(['/connexion']);
                } else {
                  this.confirmErreur = 5;
                }
              },
              (err) => {
                this.router.navigate(['/reinitialiser']);
                alert("une erreure c'est produite");
              }
            );
          } else {
            this.confirmErreur = 4;
          }
        })
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
        alert('erreur');
        this.errorAlert1 = true;
        this.confirmErreur = 1;
      }
    } else {
      this.confirmErreur = 2;
    }
  }
}
