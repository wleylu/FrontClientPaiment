import { CustomResponse } from './../model/custom-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FactureFavoris } from '../model/facture-favoris';
import { Comptemarchand } from '../model/comptemarchand.model';

@Injectable({
  providedIn: 'root'
})
export class FactureFavorisService {
  private urlServeurApi = environment.urlFinal + 'efacture';
  constructor(private http: HttpClient) { }
  public savefacturefavoris(data: FactureFavoris): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      `${this.urlServeurApi}/facturefavoris/savefacturefavoris`,
      data
    );
  }
  public listfacturefavoris(
    client: string,
    statut: boolean
  ): Observable<FactureFavoris> {
    return this.http.get<any>(
      `${this.urlServeurApi}/facturefavoris/listfacturefavoris?client=${client}&statut=${statut}`
    );
  }

  public getMarchand(refTransaction: string): Observable<Comptemarchand>{
    return this.http.get<Comptemarchand>(
      `${this.urlServeurApi}/cm/admin/benificiaire/${refTransaction}`
    );
  }


}
