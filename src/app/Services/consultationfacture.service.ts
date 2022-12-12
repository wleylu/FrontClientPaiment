import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consultation } from '../model/consultation.model';
import { CustomResponse } from '../model/custom-response';

@Injectable({
  providedIn: 'root'
})
export class ConsultationfactureService {
  private urlServeurApi = environment.urlFinal + 'efacture';
  constructor(private http: HttpClient) { }
  public getConsultationBylogin(login: string): Observable<Consultation> {
    return this.http.get<Consultation>(
      `${this.urlServeurApi}/consultation/${login}`
    );
  }
  public getFactureByNumeroFacture(numeroFacture: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(
      `${this.urlServeurApi}/consultation/getfacturebynumerofacture?numeroFacture=${numeroFacture}`
    );
  }

}
