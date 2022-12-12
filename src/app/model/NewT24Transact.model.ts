export class NouveauTransaction {
  public compteDebit: string;
  public client: string;
  public facturier: string;
  public identifiantFacture: string;
  public mntOper: number; //montant de la facture a débiter + frais
  public mntFacture: number;  // montant da la facture sans les frais
  public mntFrais: number; // montant des frais
  public mntFraisMarchand: number; // frais monta&nt part marchand
  public mntTimbre: number; //fris de timbre

}
