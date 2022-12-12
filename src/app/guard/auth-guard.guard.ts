import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { decode } from 'querystring';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard {
  constructor(private authService: AuthService,
    private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      const expectedRole = route.data.expectedRole;
      const token = localStorage.getItem('token');
      const tokenPayload = decode(token)

      if (this.authService.isUserLoggedIn())
        return true;

        this.router.navigate(['connexion']);
        return false;
      }

}
