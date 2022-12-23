import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomResponse } from 'src/app/model/custom-response';
import { FactureFavoris } from 'src/app/model/facture-favoris';
import { MessageStatut } from 'src/app/model/messageStatut.model';
import { Transaction } from 'src/app/model/transaction.model';
import { Vfacturier } from 'src/app/model/vfacturier';
import { AuthService } from 'src/app/Services/auth.service';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';
import { FactureFavorisService } from 'src/app/Services/facture-favoris.service';
import { IServiceEfactureService } from 'src/app/Services/iservice-efacture.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Comptemarchand } from '../../model/comptemarchand.model';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css'],
})
export class ChoiceComponent implements OnInit {
  formMarchand! :FormGroup;
  msgRetour! : MessageStatut;
  compteBeneficiaire!: Comptemarchand;
  factureFavoris : FactureFavoris  = new FactureFavoris();
  listTransaction : Comptemarchand[];
  messageRecherche :  string=null;

  listeFacturiers:Vfacturier[];
  ngDropdown = "Selectionner le facturier";
  factureParDefaut:string;
  loginUser=sessionStorage.getItem('authlogin');
  afficherBouton:boolean=false;
  afficherContenuSupprimer:boolean=false;
  p: number = 1;
  listFactureFavorisDesactiver: any;
  constructor(
    private formbuilber: FormBuilder,
    private factureFavorisService:FactureFavorisService,
    private iServiceEfactureService:IServiceEfactureService
    ) { }

  ngOnInit(): void {
      this.initForm();
      this.handleGetListeTrans();
      this.afficherContenuSupprimer=false;
    //  this.ngListFactureFavorisDesactiver();
  }
  nglisteFacturiers(){
    this.iServiceEfactureService.listeFacturier().subscribe(res=>{
      console.log(res);
      this.listeFacturiers= res;
    })
  }

 handleGetListeTrans(){
  this.factureFavorisService.listTransactions(this.loginUser).subscribe({
    next: (data:Comptemarchand[])=>{
        this.listTransaction = data;
    },
    error:(err)=>{
      console.log("Une erreur est survenue");
    }
  });
  }


  initForm(){
    this.formMarchand=this.formbuilber.group({
      refTransaction:['',[Validators.required]],
      codeTransaction:[''],
      nom:[''],
      prenom:[''],
      piece:[''],
      telephone:[''],
      email:[''],
      montant:[0],
      codeConfirmation:['',[Validators.required]],
    });
  }

  formMaj(marchand: Comptemarchand){
    this.formMarchand.controls['codeTransaction'].setValue(marchand.codeTransaction);
    this.formMarchand.controls['nom'].setValue(marchand.nom);
    this.formMarchand.controls['prenom'].setValue(marchand.prenom);
    this.formMarchand.controls['montant'].setValue(marchand.montant);
    this.formMarchand.controls['piece'].setValue(marchand.pieceId);
    this.formMarchand.controls['telephone'].setValue(marchand.tel);
    this.formMarchand.controls['email'].setValue(marchand.email);
    this.formMarchand.controls['codeConfirmation'].setValue((''));

    }

 formSaveBenef(){
   var madate = new Date();
   var datePipe = new DatePipe('en-US');
    let vdate = datePipe.transform(madate,'yyyy-M-dd hh:mm:s');
    this.compteBeneficiaire = new Comptemarchand();
    this.compteBeneficiaire.codeConfirmation = this.formMarchand.value.codeConfirmation;
    this.compteBeneficiaire.refTransaction = this.formMarchand.value.refTransaction;
    this.compteBeneficiaire.codeTransaction = this.formMarchand.value.codeTransaction;
    this.compteBeneficiaire.montant = this.formMarchand.value.montant;
    this.compteBeneficiaire.pieceId = this.formMarchand.value.piece;
    this.compteBeneficiaire.nom = this.formMarchand.value.nom;
    this.compteBeneficiaire.prenom = this.formMarchand.value.prenom;
    this.compteBeneficiaire.loginAdd = this.loginUser;
    this.compteBeneficiaire.loginMaj = this.loginUser;
    this.compteBeneficiaire.dateModification =vdate;
    this.compteBeneficiaire.loginModification = this.loginUser;
    this.compteBeneficiaire.email = this.formMarchand.value.email;
    this.compteBeneficiaire.tel = this.formMarchand.value.telephone;

 }

  handleGeneCode(){
    let codeRef = this.formMarchand.value.refTransaction;
    this.formMarchand.controls['codeConfirmation'].setValue('');
    this.factureFavorisService.setGenerateCode(codeRef).subscribe({
      next: (data:MessageStatut)=>{
       console.log(JSON.stringify(data));
       if(data.codeMsg === "08"){
        Swal.fire({
          tposition: 'top-end',
          icon: 'success',
          title: data.libelle,
          showConfirmButton: false,
          timer: 5000
        });
       }
       else {
        Swal.fire({
          tposition: 'top-end',
          icon: 'error',
          title: data.libelle,
          showConfirmButton: false,
          timer: 5000
        });
       }

      },
      error: (err) =>{
        console.log("Une ereur s'est produite");
      }
     });
  }


  handleRecherche(event: any){
       this.factureFavorisService.getMarchand(event.target.value).subscribe({
        next: (data:Comptemarchand)=>{
          if (!data.refTransaction){
            this.messageRecherche = "La réference est inexistante dans la base";
            let refTransac = this.formMarchand.value.refTransaction;
            this.formMarchand.reset();
            this.formMarchand.controls['refTransaction'].setValue(refTransac);

          }
          else
          {
            this.messageRecherche='';
                this.formMaj(data);
          }
               },
        error: (err) =>{
          console.log("Une ereur s'est produite");
        }
       });


  }

  savePaiement1(){
    this.formSaveBenef();
    this.listTransaction.push(this.compteBeneficiaire);
    console.log("Beneficiaire :"+JSON.stringify(this.compteBeneficiaire));
  }

  savePaiement(){
      this.formSaveBenef();
    console.log("Objet Marchand : "+JSON.stringify(this.compteBeneficiaire));
      this.factureFavorisService.setTransaction(this.compteBeneficiaire).subscribe({
        next:(data:MessageStatut)=>{
          if(data.codeMsg == "00"){
            this.listTransaction.push(this.compteBeneficiaire);
            Swal.fire({
              tposition: 'top-end',
              icon: 'success',
              title: data.libelle,
              showConfirmButton: false,
              timer: 5000
            });
            this.formMarchand.reset();
          }


          if(data.codeMsg != "00"){
            Swal.fire({
              tposition: 'top-end',
              icon: 'error',
              title: data.libelle,
              showConfirmButton: false,
              timer: 5000
            });

          }

        },
        error: (err)=>{
          console.log("Mon erreur est :"+err);
        }
      });
  }

  /* saveFactureFavoris(){
    this.factureFavoris.typeFacture=this.formFactureFavoris.value.typeFacture;
    this.factureFavoris.reference=this.formFactureFavoris.value.reference;
    this.factureFavoris.nomComplet=this.formFactureFavoris.value.nomComplet;
    this.factureFavoris.idClient=this.loginUser;
    this.factureFavoris.action=true;
    console.log(this.factureFavoris);
    this.factureFavorisService.savefacturefavoris(this.factureFavoris).subscribe((resultFactureFavoris:CustomResponse)=>{
        console.log(resultFactureFavoris);
        if (resultFactureFavoris.code==0) {
          // Swal.fire({
          //   tposition: 'top-end',
          //   icon: 'success',
          //   title: resultFactureFavoris.message,
          //   showConfirmButton: false,
          //   timer: 1500
          // })
          this.formFactureFavoris.reset();
          this.ngListFactureFavoris();
        } else {
          // Swal.fire({
          //   tposition: 'top-end',
          //   icon: 'Error',
          //   title: resultFactureFavoris.message,
          //   showConfirmButton: false,
          //   timer: 1500
          // });
        }
      });
  } */
/*

  desactiverFactureFavoris(){
    this.factureFavoris.typeFacture=this.formFactureFavoris.value.typeFacture;
    this.factureFavoris.reference=this.formFactureFavoris.value.reference;
    this.factureFavoris.nomComplet=this.formFactureFavoris.value.nomComplet;
    this.factureFavoris.idClient=this.loginUser;
    this.factureFavoris.action=false;
    this.factureFavoris.statut=false;
    console.log(this.factureFavoris);
    this.factureFavorisService.savefacturefavoris(this.factureFavoris).subscribe((resultFactureFavoris:CustomResponse)=>{
      console.log(resultFactureFavoris);
      if (resultFactureFavoris.code==0) {
        // Swal.fire({
        //   tposition: 'top-end',
        //   icon: 'success',
        //   title: resultFactureFavoris.message,
        //   showConfirmButton: false,
        //   timer: 1500
        // })

        this.formFactureFavoris.reset();
        this.ngListFactureFavorisDesactiver();
        this.ngListFactureFavoris();


      }
    })

  } */

 /*  annulerFactureFavoris(){
    this.formFactureFavoris.reset();
  }
 */

/*   onEdit(row: any) {
    //this.showAdd = 0;
    this.afficherBouton=true;
    this.factureFavoris.id=row.id;
    this.formFactureFavoris.controls['typeFacture'].setValue(row.typeFacture);

    this.formFactureFavoris.controls['reference'].setValue(
      row.reference
    );
    this.formFactureFavoris.controls['nomComplet'].setValue(row.nomComplet);
    console.log(row);
    /*
      this.formValue.controls['nom'].setValue(row.nom);
      this.formValue.controls['prenom'].setValue(row.prenom);
      this.formValue.controls['login'].setValue(row.login);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['telephone'].setValue(row.telephone);
      this.formValue.controls['password'].setValue(row.password);
      this.formValue.controls['roles'].setValue(row.roles);

  }  */

/*
  ngafficherContenuSupprimer(){
    this.afficherContenuSupprimer=true;
  }
  ngafficherContenuFactureFavoris(){
    this.afficherContenuSupprimer=false;
  }
  ngListFactureFavorisDesactiver(){
    this.factureFavorisService.listfacturefavoris(this.loginUser,false).subscribe(res=>{
      console.log(res);
      this.listFactureFavorisDesactiver=res;
    })
  } */

}
