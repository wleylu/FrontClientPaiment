import { ListeCIE } from "./ListeDesFacturesCie.model";

export class ModeleFacture {
  public CodeTraitement: number;
  public MessageTraitement: string;
  public ReferenceContrat: string;
  public AdresseTechnique: string;
  public NombreFacture: number;
  public MontantTotal: number;
  public ListeDesFactures: ListeCIE[];
}
