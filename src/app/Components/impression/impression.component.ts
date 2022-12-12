import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Consultation } from 'src/app/model/consultation.model';
import { FactureService } from 'src/app/Services/facture.service';
import { environment } from 'src/environments/environment';
import { ConsultationComponent } from '../consultation/consultation.component';
import * as html2pdf from 'html2pdf.js';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';

@Component({
  selector: 'app-impression',
  templateUrl: './impression.component.html',
  styleUrls: ['./impression.component.css'],
})
export class ImpressionComponent implements OnInit {
  @Input() envoi: Consultation;
  @Input() idActuel: any;

  productID: any;
  productData: any;
  IdConsult: any;
  summaryPaiement: any;
  mydate = Date.now();
  myAngularxQrCode: any;
  Newdate: any;
  facturier: any;
  dateExpiration: any;
  commission: any;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private factureService: FactureService,
    private consul: ConsultationComponent,
    private datepipe: DatePipe,
    public autoLogoutService: AutoLogoutService
  ) {
    this.myAngularxQrCode = 'ItSoluionStuff.com';
  }

  ngOnInit() {
    this.autoLogoutService.infoUser(localStorage.getItem('login')).subscribe(
      (res) => {
        if (res != null) {
          this.actRoute.queryParams.subscribe(
            (params: any) => {
              this.IdConsult = params.data;
            },
            (err) => {}
          );
          this.ConsultationId();

          this.summaryPaiement = 'www.banqueatlantique.net';
        } else {
          this.autoLogoutService.Logout(this.router);
          this.router.navigate(['/connexion'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }
      },
      (err) => {
        this.autoLogoutService.Logout(this.router);
        this.router.navigate(['/connexion'], {
          queryParams: { returnUrl: this.router.routerState.snapshot.url },
        });
      }
    );
  }

  ConsultationId() {
    this.httpClient
      .get<Consultation>(
        environment.urlFinal +
          'efacture/consultation/recherche/' +
          this.IdConsult
      )
      .subscribe(
        (Historique: Consultation) => {
          this.productData = Historique;
          this.facturier = this.productData.facturier;

          this.factureService
            .commissionByMtn(this.facturier, this.productData.montantDebite)
            .subscribe((com: any) => {
              this.commission = com.commissionBanque;
            });
          let da = this.productData.dtExpFacture;

          localStorage.setItem('ref', this.productData.reference);
          if (da) {
            this.dateExpiration = da.replace(/\//g, '-');
          } else {
            this.dateExpiration = 'N/A';
          }
        },
        (err) => {
          this.autoLogoutService.autoLogout(err.status, this.router);
        }
      );
  }

  GetCommission() {
    this.httpClient
      .get(environment.urlFinal + 'efacture/commission/CIE/2050')
      .subscribe((com) => {});
  }

  exportPdf() {
    const options = {
      filename: 'Recu de paiement ' + this.productData.referenceFT,
      image: { type: 'png', quality: 0.98 },
      html2canvas: {},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    const content: Element = document.getElementById('export');

    html2pdf().from(content).set(options).save();
  }
}
