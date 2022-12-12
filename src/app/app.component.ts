import { AuthService } from './Services/auth.service';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AutoLogoutService } from './Services/auto-logout.service';
import { Router } from '@angular/router';
import { disconnect } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../app/css/bootstrap.min.css'],
})
export class AppComponent {
  public isMenuCollapsed = true;
  username: string;
  confirm: string;
  client: string;
  stringCompte: any;
  objCompte: any;
  f: [];
  title = 'Efacture';
  all: any;
  valeurLocal: any;
  oldValeur: any;
  constructor(
    public connexion: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    public autoLogoutService: AutoLogoutService
  ) {}

  ngOnInit() {
    this.client = localStorage.getItem('nomPrenom');
  }

  public doUnload(): void {
    this.doBeforeUnload();
    localStorage.removeItem('username_key');
    localStorage.removeItem('raouf');
    localStorage.removeItem('client');
  }

  public doBeforeUnload(): void {
    //alert('asdasdasdjhfvyu');
    localStorage.removeItem('username_key');
    localStorage.removeItem('raouf');
    localStorage.removeItem('client');
  }

  public storeData(txt): void {
    //alert('ok');
    localStorage.setItem('username_key', txt);
    localStorage.setItem('raouf', 'raouf');
  }

  public storageChange() {
    window.addEventListener('storage', function (e) {
      var r = e.oldValue;
      var n = e.newValue;

      this.localStorage.clear();
    });
  }

  disconnect() {
    this.autoLogoutService.Logout(this.router);
    this.router.navigate(['/connexion'], {
      queryParams: { returnUrl: this.router.routerState.snapshot.url },
    });
  }
}
