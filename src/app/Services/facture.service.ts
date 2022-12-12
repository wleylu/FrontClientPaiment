import { T24Transaction } from './../model/t24Transaction.model';
import { envoiT24Transaction } from './../model/envoiT24Transaction.model';
import { AddReclamation } from './../model/Addreclamation.model';
import { Reclamations } from './../model/reclamation.model';
import { ListeConsul } from './../model/listeConsultation.model';
import { Consultation } from './../model/consultation.model';
import { Observable } from 'rxjs';
import { Identifiant } from './../model/identifiant.model';
import { HttpClient } from '@angular/common/http';
import { Facture } from './../model/facture.model';
import { Injectable } from '@angular/core';
import { Commissions } from '../model/commission.model';
import { environment } from 'src/environments/environment';
import { flatMap, first, shareReplay, timeout } from 'rxjs/operators';
import { ModeleFacture } from '../model/cieFacture.model';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  factures: Facture;
  list : any=[];
  consultation: Consultation;
  addReclamation: AddReclamation;
  t24Transaction: T24Transaction;
  facturesCie : ModeleFacture;
  private baseUrlMail = environment.urlFinal +'efacture/mails';
  URLCie : string = "http://10.181.5.23:8080/ABIMicroservices/serviceNMPF/consulfact/"
  private product$: Observable<Consultation[]>;

  private baseUrl: string = environment.urlFinal +'efacture/consultation/liste';
  constructor(private httpClient: HttpClient) {
    this.factures = new Facture();
    this.facturesCie = new ModeleFacture();
    this.consultation = new Consultation();
    this.addReclamation = new AddReclamation();
    this.t24Transaction = new T24Transaction();
  }

  SearchId(identifiant: Identifiant): Observable<any> {
    return this.httpClient.post<Facture>(
      environment.urlFinal +'efacture/rechercheByIdent',
      identifiant
    ).pipe(timeout(10000));
  }

  AddHistorique(listeConsul: ListeConsul): Observable<any> {
    return this.httpClient.post<Consultation>(
      environment.urlFinal +'efacture/consultation/historique',
      listeConsul
    );
  }
  ListHistorique() {
    this.httpClient.get<any>(environment.urlFinal +'efacture/consultation/liste').subscribe((Historique)=>{
      console.log(Historique)
    });
  }

  AddReclamation(reclam: Reclamations): Observable<any> {
    return this.httpClient.post<AddReclamation>(
      environment.urlFinal +'efacture/reclamation/add',
      reclam
    );
  }

  AddTransaction(transactiont24: envoiT24Transaction): Observable<any> {
    return this.httpClient.post<T24Transaction>(
      environment.urlFinal +'efacture/tr/Addtransaction',
      transactiont24
    );
  }


GetTypeConfirmation(){
  return this.httpClient.get(environment.urlFinal +'efacture/typePaie')
}
  getProductById(id: number): Observable<Consultation> {
    return this.getProducts().pipe(
      flatMap((result) => result),
      first((envoi) => envoi.id == id)
    );
  }


  getProducts() : Observable<Consultation[]>
    {
        if (!this.product$)
        {
            this.product$ = this.httpClient.get<Consultation[]>(this.baseUrl).pipe(shareReplay());
        }

        return this.product$;

    }

    getConsultationById(id): Observable<any> {
      return this.httpClient.get(environment.urlFinal +'efacture/consultation/recherche/'+id);
    }


    EnvoiMail(info: Object): Observable<Object> {
      return this.httpClient.post(environment.urlFinal +'efacture/mails/email', info);
    }

    GetAll(): Observable<any> {


      return this.httpClient.get(environment.urlFinal +'efacture/mails/email');
    }


    Envoierror(info: Object): Observable<Object> {
      return this.httpClient.post(environment.urlFinal +'efacture/erreurs/addErreurs', info);
    }

    Facture() : Observable <any> {
      return this.httpClient.get<any>('http://10.100.10.6:8080/ABIMicroservices/serviceNMPF/getfacturecie', {responseType: 'json'})

     }


DetailsUser(login : any) : Observable<any>{
return this.httpClient.get<any>(environment.urlFinal +'efacture/user/detailUser',login)
}


rechercheByDateBetween(startDate: any,endDate: any,):Observable<any> {
  return this.httpClient.get<any>(`${environment.urlFinal +'efacture/'}consultation/date?login=${localStorage.getItem('login')}&startDate=${startDate}&endDate=${endDate}`);
}

FactureByIdAndPer(idabon : any, perfact:any) : Observable<any>{
  return this.httpClient.get<any>(`${environment.urlFinal +'efacture/'}em/rechercheByIdabonAndPeriode?idabon=${idabon}&perfact=${perfact}`);
}

CieFactureByIdAndPer(idabon : any, perfact:any) : Observable<any>{
  return this.httpClient.get<any>(`${environment.urlFinal +'efacture/'}em/CieRechercheByIdabonAndPeriode?idabon=${idabon}&perfact=${perfact}`);
}

commissionByMtn(facturier : any, montant : any) :  Observable<any>{
  return this.httpClient.get<any>(environment.urlFinal + 'efacture/commission/'+facturier+'/'+montant);
}

}
