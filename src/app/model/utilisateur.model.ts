export class Utilisateur {

  id!: number;
  login!: string;
  password!: string;
  password1!: string;
  password2!: string;
  nom!:string;
  prenom!:string;
  email!:string;
  tel!:string;
  habilitation!: string;
  validation!:number;
  status!: number;
  bloquser!:number;
  dateCreation!:Date;
  client!: string;
  adCm!: string;
  mdpOublie!: string;
  typePlafond!:number;
  typeComfirmation!:number;
  dateMdp : Date;

  //   visibilite: boolean;
}
