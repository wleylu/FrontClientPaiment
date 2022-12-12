export class T24Transaction {
  public prefixe: string = 'PAIE|M|M|';
  public facturier: string;
  public Date: string;
  public codOper: string;
  public identifiantFacture: string;
  public compteDebit: string;
  public compteCredit: string;
  public mntOper: number; //montant de la facture a débiter + frais
  public mntFacture: number;  // montant da la facture sans les frais
  public mntFrais: number; // montant des frais
  public mntMarchand: number; // montant de la part de la banque
  public mntFraisMarchand: number; // frais monta&nt part marchand
  public mntTimbre: number; //fris de timbre
  public libelleOper: string; //libelle de l'opération
  public compteCom: string; //compte de commision
  public refOld: string;
  public statutTraitement: string;
  public codeTraitement: number;

}
