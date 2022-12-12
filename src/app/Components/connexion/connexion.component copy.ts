// import { Login } from './../../model/login.model';
// import { User_login } from 'src/app/model/user_login.model';
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/Services/auth.service';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/user.model';
// import { Injectable } from '@angular/core';
// import { NgxCaptchaModule } from 'ngx-captcha';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import { HomeComponent } from '../home/home.component';
// import { Location } from '@angular/common';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { FactureService } from 'src/app/Services/facture.service';

// @Component({
//   selector: 'app-connexion',
//   templateUrl: './connexion.component.html',
//   styleUrls: ['./connexion.component.css'],
// })
// @Injectable({
//   providedIn: 'root',
// })
// export class ConnexionComponent implements OnInit {
//   siteKey: string;
//   erreur: boolean;
//   login = '';
//   password = '';
//   invalidLogin = false;
//   loginn: Login;
//   username: any;
//   ErrorForm : FormGroup;
//   falseLogin : boolean;
//   blockUser: boolean;

//   constructor(
//     private factureService : FactureService,
//     private router: Router,
//     private loginservice: AuthService,
//     private home: HomeComponent,
//     public _location: Location,
//     private fb: FormBuilder,
//   ) {
//     this.siteKey = '6Ld-IqIcAAAAAKgUpoOGR9iMLAth5vQtfhgYiJfb';
//     this.loginn = new Login();
//   }

//   ngOnInit() {

//   }

//   numberOnly(event): boolean {
//     const charCode = (event.which) ? event.which : event.keyCode;
//     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//       return false;
//     }
//     return true;

//   }

//   checkLogin() {
//     if (this.login === '' || this.password === '') {
//       this.erreur = true;
//     } else {
//       this.loginn.login = this.login;
//       this.loginn.password = this.password;
//       this.loginservice.authenticates(this.loginn).subscribe(
//         (response ) => {
//           console.log('user' + JSON.stringify(response));
//           this.username = response;

//           if (this.username === null) {
//             this.falseLogin = true;
//             this.blockUser = false;
//             Toast.fire({
//               icon: 'error',
//               title: 'Identifiants incorrects',
//             });
//           }

//           if (response) {
//             localStorage.setItem('mdpfirst', response.password)
//             if(response.password1 === '' || response.password1 === null ){
//               localStorage.setItem('loginfirst',response.login)
//               this.router.navigate(['changePassword'])
//             }
//             else{
//               if(response.bloquser === 0 && response.validation ===1 && response.status === 1){
//             var nomPrenom = response.nom + ' ' + response.prenom;
//             console.log(nomPrenom);
//             var nom = response.nom;
//             localStorage.setItem('nom', nom);
//             var login = response.login;
//             var prenom = response.prenom;
//             var contact = response.tel;
//             var email = response.email;
//             var typePlafond  = response.typePlafond;
//             var typeConfirmation = response.typeComfirmation;
//             var CptMaxTransaction = response.cptNbTransaction;
//             var CptMaxMontant = response.cptMontant;
//             localStorage.setItem('MaxMontant', CptMaxMontant);
//             localStorage.setItem('MaxTransac', CptMaxTransaction);
//             localStorage.setItem('typePlafond', typePlafond);
//             localStorage.setItem('typeConfirmation', typeConfirmation);
//             localStorage.setItem('email', email);
//             localStorage.setItem('prenom', prenom);
//             localStorage.setItem('contact', contact);
//             localStorage.setItem('nomPrenom', response.nom + ' ' + response.prenom);
//             localStorage.setItem('login',login);
//             localStorage.setItem('confirm', this.password);
//             this.loginservice.ValeurStorage(this.loginn.login);

//             this.router.navigate(['home']);

//             this.invalidLogin = false;
//             Toast.fire({
//               icon: 'success',
//               title: 'Connexion réussie !',
//             });
//           }
//           else{
//             this.falseLogin = false;
//             this.blockUser = true;
//             Toast.fire({
//               icon: 'Erreur',
//               title: 'Compte non Activé , Veuillez contacter l\'administrateur de la plateforme',
//             });
//           }

//           }
//             // console.log('connexion success');
//           }
//         },

//         (error) => {
//           console.log('erreurLogin' + JSON.stringify(error));

//           this.ErrorForm = this.fb.group({

//             httpStatusCode: '402',
//             methode : 'checkLogin',
//             login: this.login,
//             message : JSON.stringify(error.name),
//             description:JSON.stringify(error.message) + '\n'+ JSON.stringify(error.error),
//           });
//           this.factureService.Envoierror(this.ErrorForm.value).subscribe((res)=>{
//             console.log(this.ErrorForm.value);
//             console.log(res)
//           })

//         }
//       );

//       const Toast = Swal.mixin({
//         toast: true,
//         position: 'top-end',
//         icon: 'center',
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener('mouseenter', Swal.stopTimer);
//           toast.addEventListener('mouseleave', Swal.resumeTimer);
//         },
//       });
//     }
//     this.home.ref();
//     //this.refresh()
//   }

//   refresh() {
//     this.router
//       .navigateByUrl('/home', { skipLocationChange: true })
//       .then(() => {
//         console.log(decodeURI(this._location.path()));
//         this.router.navigate([decodeURI(this._location.path())]);
//       });
//   }

//   // checkLogin() {
//   //   if (this.loginservice.authenticate(this.login, this.password)
//   //   ) {
//   //     this.router.navigate(['home']);
//   //     // this.invalidLogin = false;
//   //     console.log('OK LOGIN')
//   //   } else

//   //     // this.invalidLogin = true
//   //     this.erreur = 1
//   // }
// }
