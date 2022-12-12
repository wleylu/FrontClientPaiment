import { Paiement } from './../model/paiement.model';
import { Injectable } from '@angular/core';
import { Facture } from '../model/facture.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model';
import { Cietransaction } from '../model/cietransaction.model';
import { TraitementCie } from '../model/traitementCie.model';
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs/operators';
import { ReglementSodeci } from '../model/ReglementSodeci.model';
import { NouveauTransaction } from '../model/NewT24Transact.model';
import { ReglementCie } from '../model/ReglementCie.model';
import { Commissions } from '../model/commission.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl: string =
    'http://10.181.5.23:8080/ABIMicroservices/serviceNMPF/reglFacture/';
  transactions: NouveauTransaction;

  constructor(private httpClient: HttpClient) {
    this.transactions = new NouveauTransaction();
  }

  Transaction(paiement: NouveauTransaction): Observable<any> {
    return this.httpClient
      .post<NouveauTransaction>(environment.urlFinal + 'Api/pay', paiement)
      .pipe(timeout(90000));
  }

  TransactionCie(cieTransaction: Cietransaction): Observable<any> {
    return this.httpClient.post<TraitementCie>(
      environment.urlFinal + 'Api/paie/cie',
      cieTransaction
    );
  }

  TransactionSodeci(sodeciTransaction: Cietransaction): Observable<any> {
    return this.httpClient.post<TraitementCie>(
      environment.urlFinal + 'Api/paie/sodeci',
      sodeciTransaction
    );
  }

  ReglementSodeci(rgSodeci: ReglementSodeci): Observable<any> {
    return this.httpClient.post<ReglementSodeci>(
      environment.urlFinal + 'efacture/rg/addRgSodeci',
      rgSodeci
    );
  }

  ReglementCie(rgCie: ReglementCie): Observable<any> {
    return this.httpClient.post<ReglementCie>(
      environment.urlFinal + 'efacture/rg/addRgCie',
      rgCie
    );
  }

  public getCommissionByClient(client: string): Observable<Commissions[]> {
    return this.httpClient.get<any>(
      `${environment.urlFinal}efacture/commission/getcommissionbyclient/${client}`
    );
  }
}
