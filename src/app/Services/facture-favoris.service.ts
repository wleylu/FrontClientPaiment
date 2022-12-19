import { CustomResponse } from './../model/custom-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FactureFavoris } from '../model/facture-favoris';
import { Comptemarchand } from '../model/comptemarchand.model';
import { MessageStatut } from '../model/messageStatut.model';
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class FactureFavorisService {
  private urlServeurApi = environment.urlFinal + 'efacture';
  constructor(private http: HttpClient) { }


  public listTransactions(loginAdd: string): Observable<Comptemarchand[]> {
    return this.http.get<any>(
      `${this.urlServeurApi}/cm/admin/listransations/${loginAdd}`
    );
  }

  public getMarchand(refTransaction: string): Observable<Comptemarchand>{
    return this.http.get<Comptemarchand>(
      `${this.urlServeurApi}/cm/admin/benificiaire/${refTransaction}`
    );
  }

  public setGenerateCode(refTransaction: string): Observable<MessageStatut>{
    return this.http.get<MessageStatut>(
      `${this.urlServeurApi}/cm/admin/generateCode/${refTransaction}`
    );
  }


  public setTransaction(marchand: Comptemarchand): Observable<MessageStatut>{
    return this.http.post<MessageStatut>(this.urlServeurApi+"/cm/admin/transaction",marchand);
  }


}
