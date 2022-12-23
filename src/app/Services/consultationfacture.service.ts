import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comptemarchand } from '../model/comptemarchand.model';
import { Consultation } from '../model/consultation.model';
import { CustomResponse } from '../model/custom-response';

@Injectable({
  providedIn: 'root'
})
export class ConsultationfactureService {
  private urlServeurApi = environment.urlFinal + 'efacture';
  constructor(private http: HttpClient) { }


  public getAllTransaction(login: string,refTran: string,
         codeTran: string,
         dateDebut: string,
         dateFin: string):Observable<Comptemarchand[]>{
      return this.http.get<Comptemarchand[]>(`${this.urlServeurApi}/cm/admin/listransactions?loginAdd=${login}&refTran=${refTran}&codeTran=${codeTran}&dateDebut=${dateDebut}&dateFin=${dateFin}`);
  }

}
