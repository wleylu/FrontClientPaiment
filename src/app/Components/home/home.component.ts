import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, RendererStyleFlags2 } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  client: any;

  constructor(config: NgbCarouselConfig,
    private navbar: AppComponent,
    private router: Router,
    private autoLogoutService: AutoLogoutService,
    public _location: Location) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  ngOnInit() {

    this.autoLogoutService.infoUser(localStorage.getItem('login')).subscribe((res) => {

      if (res != null) {
        this.client = localStorage.getItem('nomPrenom');
        this.navbar.ngOnInit();

      }
      else{
        this.autoLogoutService.Logout(this.router);
        this.router.navigate(['/connexion'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } })
      }
    }, err => {
      this.autoLogoutService.Logout(this.router);
      this.router.navigate(['/connexion'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } })

    })



  }

  refresh(): void {
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {

      this.router.navigate([decodeURI(this._location.path())]);
    });
  }


  ref() {

    this.router.navigate(['home'])
  }



}
