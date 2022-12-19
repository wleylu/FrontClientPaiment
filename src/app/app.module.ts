
import { NgModule, Component, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { ConsultationComponent } from './Components/consultation/consultation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ChoiceComponent } from './Components/choice/choice.component';
import { ReclamationsComponent } from './Components/reclamations/reclamations.component';
import { EnvoiPaiementSodeciComponent } from './Components/envoi-paiement-sodeci/envoi-paiement-sodeci.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { EnvoiPaiementCieComponent } from './Components/envoi-paiement-cie/envoi-paiement-cie.component';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { ImpressionComponent } from './Components/impression/impression.component';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { LOCALE_ID } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';
import { ForgotPwdComponent } from './Components/forgot-pwd/forgot-pwd.component';
import { ResetScreenComponent } from './Components/reset-screen/reset-screen.component';
import { FirstconnexionComponent } from './Components/firstconnexion/firstconnexion.component';
import { PageDeConnexionComponent } from './Components/page-de-connexion/page-de-connexion.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { PageTestComponent } from './Components/page-test/page-test.component';
import { PremiereConnectComponent } from './Components/premiere-connect/premiere-connect.component';
import { CryptoService } from './Services/crypto.service';
import { BasicAuthHtppInterceptorService } from './Services/basic-auth-interceptor.service';
import { ChangePwdComponent } from './Components/change-pwd/change-pwd.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsultationComponent,
    LogoutComponent,
    EnvoiPaiementCieComponent,
    EnvoiPaiementSodeciComponent,
    AppComponent,
    HomeComponent,
    ConsultationComponent,
    ReclamationsComponent,
    ConnexionComponent,
    ChoiceComponent,
    LoaderComponent,
    SearchfilterPipe,
    ImpressionComponent,
    ForgotPwdComponent,
    ResetScreenComponent,
    FirstconnexionComponent,
    PageDeConnexionComponent,
    ProfilComponent,
    PageTestComponent,
    PremiereConnectComponent,
    ChangePwdComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    QRCodeModule,
    NgxPaginationModule,
    NgxCaptchaModule,
    RecaptchaModule,



  ],
  providers: [CryptoService,{
    provide : APP_INITIALIZER,
    useFactory:(ds : CryptoService)=> () => ds.init(),
    deps:[CryptoService],
    multi:true},
  ConsultationComponent, HomeComponent, DatePipe,{ provide: LOCALE_ID, useValue: "fr-FR"} ,{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
