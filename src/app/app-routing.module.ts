import { LogoutComponent } from './Components/logout/logout.component';
import { ChoiceComponent } from './Components/choice/choice.component';
import { ConsultationComponent } from './Components/consultation/consultation.component';
import { HomeComponent } from './Components/home/home.component';
import { componentFactoryName } from '@angular/compiler';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvoiPaiementCieComponent } from './Components/envoi-paiement-cie/envoi-paiement-cie.component';
import { EnvoiPaiementSodeciComponent } from './Components/envoi-paiement-sodeci/envoi-paiement-sodeci.component';
import { ReclamationsComponent } from './Components/reclamations/reclamations.component';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { ImpressionComponent } from './Components/impression/impression.component';
import { ForgotPwdComponent } from './Components/forgot-pwd/forgot-pwd.component';
import { ResetScreenComponent } from './Components/reset-screen/reset-screen.component';
import { FirstconnexionComponent } from './Components/firstconnexion/firstconnexion.component';
import { PageDeConnexionComponent } from './Components/page-de-connexion/page-de-connexion.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { ComptesconnexionGuard } from './comptesconnexion.guard';
import { PageTestComponent } from './Components/page-test/page-test.component';
import { PremiereConnectComponent } from './Components/premiere-connect/premiere-connect.component';
import { ChangePwdComponent } from './Components/change-pwd/change-pwd.component';

const routes: Routes = [
  {
    path: 'test',
    component: PageTestComponent,
  },
  {
    path: 'forgot',
    component: ForgotPwdComponent,
  },

  {
    path: 'firstConnexion',
    component: FirstconnexionComponent,
  },

  {
    path: 'resetPwd',
    component: ResetScreenComponent,
  },

  {
    path: 'changePassword',
    component: PageDeConnexionComponent,
  },

  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'connexiion',
    component: PremiereConnectComponent,
  },

  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuardGuard],
  },

  {
    pathMatch: 'full',
    path: 'consultation/print',
    component: ImpressionComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'paiement',
    component: ChoiceComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'pay/Cie',
    component: EnvoiPaiementCieComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'pay/Sodeci',
    component: EnvoiPaiementSodeciComponent,
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'consultation',
    component: ConsultationComponent,
    canActivate: [AuthGuardGuard],
  },
    {
    path: 'reclamations',
    component: ReclamationsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'reinitialiser',
    component: ChangePwdComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
