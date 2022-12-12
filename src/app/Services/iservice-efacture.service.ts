import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vfacturier } from '../model/vfacturier';

@Injectable({
  providedIn: 'root'
})
export class IServiceEfactureService {
  private urlServeurApi = environment.urlFinal + 'efacture';
  constructor(private http: HttpClient) { }

  public listeFacturier():Observable<Vfacturier[]>{
    return this.http.get<any>(`${this.urlServeurApi}/facturier/Allfacturier`);
  }
}
