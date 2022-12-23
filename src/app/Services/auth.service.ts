import { Injectable } from '@angular/core';
import { User_login } from '../model/user_login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Mail } from '../model/mail.model';

import { map } from 'rxjs/operators';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  header: HttpHeaders;
  headeroff: HttpHeaders;
  redirectUrl!: string;
  users: User_login;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.users = new User_login();
  }
  loggedUser: string;

  public login(login: string, password: string): Observable<Utilisateur> {

    return this.httpClient.post<any>(environment.urlFinal + 'efacture/login', {
      login: login,
      password: password,
    });
  }

  authentification(login: any, password1: string) {
    const UserData = login + ':' + password1;

    this.header = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Basic ' + btoa(UserData),
    });

    this.header.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE'
    );
    this.header.append(
      'Access-Control-Allow-Headers',
      'Content-Type, application/x-www-form-urlencoded, X-Requested-With'
    );
    this.header.append('Status Code', '200');
    return this.httpClient
      .post<any>(environment.urlFinal + 'authenticate', { login, password1 })
      .pipe(
        map((userData) => {
          localStorage.setItem('login', login);
          this.loggedUser = login;
          let tokenStr = 'Bearer ' + userData.token;
          localStorage.setItem('token', tokenStr);

          localStorage.setItem('userHabilitation', userData.habilitation);
          console.log(userData.habilitation + 'HABILITATTION');

          return userData;
        })
      );
  }

  PremiereConnect(login: any, password: string) {
    return this.httpClient
      .post<any>(environment.urlFinal + 'efacture/user/connexion', {
        login,
        password,
      })
      .pipe(
        map((userData) => {
          localStorage.setItem('login', login);
          this.loggedUser = login;
          let tokenStr = 'Bearer ' + userData.token;
          localStorage.setItem('token', tokenStr);

          return userData;
        })
      );
  }
  ValeurStorage(client: string): void {
    sessionStorage.setItem('client', client);
    this.loggedUser = client;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('client');

    return user;
  }

  logOut() {
    localStorage.removeItem('client');
    localStorage.removeItem('confirm');
    localStorage.clear();
    sessionStorage.clear();
  }

  public emails(data: Mail): Observable<Mail> {
    return this.httpClient.post<any>(`urlMail`, data);
  }

  public auditLogout(login: any): Observable<any> {
    return this.httpClient.get<any>(
      environment.urlFinal + 'efacture/deconnexion/' + login
    );
  }

  mpasse() {
    this.router.navigate(['app/modificationpassword']);
  }
  public firstconnexion(data: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<any>(
      environment.urlFinal + 'efacture/firstLogin',
      data
    );
  }

  public infoUser(login: any): Observable<any> {
    return this.httpClient.get<any>(
      environment.urlFinal + 'efacture/detailUser/' + login
    );
  }

  public decriptPwd(login:any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.httpClient.get<any>( environment.urlFinal +'efacture/chiffreStringg/' +login, requestOptions);
  }
}
