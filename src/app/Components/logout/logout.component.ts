import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authentocationService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authentocationService.logOut();
    localStorage.removeItem('tentativeLogin');
    localStorage.removeItem('userConnect');
    localStorage.removeItem('authisAuth1');
    localStorage.removeItem('authbloquser');
    localStorage.removeItem('authclient');
    localStorage.removeItem('authdateCreation');
    localStorage.removeItem('authemail');
    localStorage.removeItem('authhabilitation');
    sessionStorage.removeItem('authlogin');
    localStorage.removeItem('authnom');
    localStorage.removeItem('authpassword');
    localStorage.removeItem('authpassword1');
    localStorage.removeItem('authpassword2');
    localStorage.removeItem('authprenom');
    localStorage.removeItem('authstatus');
    localStorage.removeItem('authtel');
    localStorage.removeItem('authtypePlanfond');
    localStorage.removeItem('authvalidation');
    sessionStorage.removeItem('client');
    localStorage.removeItem('confirm');
    localStorage.removeItem('codeTraitement');
    localStorage.removeItem('typeConfirmation');
    localStorage.removeItem('refContrat');
    localStorage.removeItem('NoOper');
    localStorage.removeItem('contact');
    localStorage.removeItem('confirm');
    localStorage.removeItem('statutRetour');
    localStorage.removeItem('nomPrenom');
    localStorage.removeItem('email');
    localStorage.removeItem('MaxMontant');
    localStorage.removeItem('MaxTransac');
    localStorage.removeItem('prenom');
    localStorage.removeItem('typePlafond');
    localStorage.removeItem('temporaireMdp');
    localStorage.removeItem('oldname');
    localStorage.removeItem('userConnect');
    localStorage.clear();
    localStorage.clear();

    localStorage.removeItem('authisAuth1');
    localStorage.removeItem('authbloquser');
    localStorage.removeItem('authclient');
    localStorage.removeItem('authdateCreation');
    localStorage.removeItem('authemail');
    localStorage.removeItem('authhabilitation');
    localStorage.removeItem('authlogin');
    localStorage.removeItem('authnom');
    localStorage.removeItem('authpassword');
    localStorage.removeItem('authpassword1');
    localStorage.removeItem('authpassword2');
    localStorage.removeItem('authprenom');
    localStorage.removeItem('authstatus');
    localStorage.removeItem('authtel');
    localStorage.removeItem('authtypePlanfond');
    localStorage.removeItem('authvalidation');
    localStorage.removeItem('client');
    localStorage.clear();
    this.router.navigate(['connexion']);
  }
}
