import { Utilisateur } from "./utilisateur.model";
import { Vfacturier } from "./vfacturier";

export class FactureFavoris {
   id: number=0;
  typeFacture: number=0;
  reference: string='';
  nomComplet: string='';
  idClient: String;
  statut: boolean=true;
  dateCreate: Date ;
  dateUpdate: Date;
  action: boolean;
  utilisateur:Utilisateur;
  vfacturier:Vfacturier;
}
