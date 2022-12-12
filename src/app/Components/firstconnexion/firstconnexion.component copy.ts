// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from 'src/app/model/user.model';
// import { AuthService } from 'src/app/Services/auth.service';

// @Component({
//   selector: 'app-firstconnexion',
//   templateUrl: './firstconnexion.component.html',
//   styleUrls: ['./firstconnexion.component.css']
// })
// export class FirstconnexionComponent implements OnInit {

//   firstConnexionForm! : FormGroup;
//   submitted: boolean = false;
//   user = new User();
//   compteuserObj = new User();
//   erreur = 0;
//   confirmErreur!:number;
//   constructor( private authService : AuthService, private formbuilber: FormBuilder,
//     private router:Router) { }

//   ngOnInit(): void {
//     this.firstConnexionForm = this.formbuilber.group({
//       login : ['',Validators.required],
//       password : ['',Validators.required],
//       password1 : ['',Validators.required],
//       confirmPassword: ['',Validators.required]
//       }
//       );
//   }
//   isControle(controlName: string, validationType: string){
//     const control = this.firstConnexionForm.controls[controlName];
//       if (!control) {
//         return false;
//       }
//       const result = control.hasError(validationType) && (control.dirty || control.touched);
//       return result;
//   }


// // onLoggedin()
// // {
// //   this.authService.login(this.formValue.value.login, this.formValue.value.password).subscribe(res=>{
// //     console.log(res);
// //     if(res !== null && res.status==1 && res.validation==1 && res.bloquser==0){
// //       console.log(res);
// //       localStorage.setItem('isAuth',JSON.stringify(res));
// //       this.router.navigate(['/firstConnection']);
// //       //this.router.navigate(['app/compteconnexion']);
// //     }else{
// //       console.log(res);
// //       this.router.navigate(['/connection']);
// //     }
// //   },
// //   err=>{
// //     alert("une erreure c'est produite");
// //   })

// //    /* authentification()
// //     { this.router.navigate(['/app/accueil'])} */

// // }

//   onLoggedin(){
//     const controls = this.firstConnexionForm.controls;
//     if (this.firstConnexionForm.invalid) {
//       Object.keys(controls).forEach(controlName =>
//         controls[controlName].markAsTouched()
//       );
//       return;
//     }
//     //this.compteuserObj.password1 = this.firstConnexionForm.value.password;
//     console.log(this.firstConnexionForm.value.password1)
//     console.log(this.firstConnexionForm.value.confirmPassword)


//     if (this.firstConnexionForm.value.password1 != null && this.firstConnexionForm.value.password1 != '') {
//       console.log('oook');
//       console.log(localStorage.getItem('login'));

//       if (this.firstConnexionForm.value.password1===this.firstConnexionForm.value.confirmPassword) {

//         console.log("mot de passe modifier avec succes");
//         this.compteuserObj.login=this.firstConnexionForm.value.login;
//         this.compteuserObj.password=this.firstConnexionForm.value.password;
//         this.compteuserObj.password1=this.firstConnexionForm.value.password1;
//         console.log(this.compteuserObj.password1);
//         console.log(this.compteuserObj.login);
//         console.log(this.compteuserObj.password);
//         console.log(localStorage.getItem('login'))
//         console.log(localStorage.getItem('password'))
//         console.log(this.compteuserObj);
//         if (this.firstConnexionForm.value.password === localStorage.getItem('password') && this.firstConnexionForm.value.login === localStorage.getItem('login')) {
//           this.authService.firstconnexion(this.compteuserObj).subscribe(res=>{
//             if (res.password !== res.password1) {
//               console.log(res);
//               this.router.navigate(['authentication'])
//             } else {
//               console.log("erreurs");
//               this.router.navigate(['/firstconnexion']);
//             }

//       },
//       err=>{
//         alert("une erreur c'est produite");
//       })
//         } else {
//           console.log(localStorage.getItem('login'))
//           console.log(localStorage.getItem('password'))
//           alert("une erreur");
//         }
//         localStorage.removeItem('isAuth');
//         localStorage.removeItem('bloquser');
//         localStorage.removeItem('client');
//         localStorage.removeItem('dateCreation');
//         localStorage.removeItem('email');
//         localStorage.removeItem('habilitation');
//         localStorage.removeItem('login');
//         localStorage.removeItem('nom');
//         localStorage.removeItem('password');
//         localStorage.removeItem('password1');
//         localStorage.removeItem('password2');
//         localStorage.removeItem('prenom');
//         localStorage.removeItem('status');
//         localStorage.removeItem('tel');
//         localStorage.removeItem('typePlanfond');
//         localStorage.removeItem('validation');
//         // this.router.navigate(['/firstconnexion']);
//         //this.router.navigate(['app/compteconnexion']);
//        // alert("mot de passe modifier avec succes");

//       }else{
//        // alert("erreur");
//         this.confirmErreur=1;
//       }
//     }else{
//       this.confirmErreur=2;
//     }


//   }
// }
