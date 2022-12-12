import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomResponse } from 'src/app/model/custom-response';
import { Vfacturier } from 'src/app/model/vfacturier';
import { FactureFavorisService } from 'src/app/Services/facture-favoris.service';
import { IServiceEfactureService } from 'src/app/Services/iservice-efacture.service';
import { FactureFavoris } from '../../model/facture-favoris';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-facture-favoris',
  templateUrl: './facture-favoris.component.html',
  styleUrls: ['./facture-favoris.component.css']
})
export class FactureFavorisComponent implements OnInit {
  formFactureFavoris :FormGroup;
  factureFavoris : FactureFavoris  = new FactureFavoris();
  listFactureFavoris : any;
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
    this.formFactureFavoris=this.formbuilber.group({
        typeFacture:[''],
        reference:[''],
        nomComplet:['']
      });
      this.nglisteFacturiers();
      this.ngListFactureFavoris();
      this.afficherContenuSupprimer=false;
      this.ngListFactureFavorisDesactiver();
  }
  nglisteFacturiers(){
    this.iServiceEfactureService.listeFacturier().subscribe(res=>{
      console.log(res);
      this.listeFacturiers= res;
    })
  }
  ngListFactureFavoris(){
    this.factureFavorisService.listfacturefavoris(this.loginUser,true).subscribe(res=>{
      console.log(res);
      this.listFactureFavoris=res;
    })
  }
  saveFactureFavoris(){
    this.factureFavoris.typeFacture=this.formFactureFavoris.value.typeFacture;
    this.factureFavoris.reference=this.formFactureFavoris.value.reference;
    this.factureFavoris.nomComplet=this.formFactureFavoris.value.nomComplet;
    this.factureFavoris.idClient=this.loginUser;
    this.factureFavoris.action=true;
    console.log(this.factureFavoris);
    this.factureFavorisService.savefacturefavoris(this.factureFavoris).subscribe((resultFactureFavoris:CustomResponse)=>{
        console.log(resultFactureFavoris);
        if (resultFactureFavoris.code==0) {
          Swal.fire({
            tposition: 'top-end',
            icon: 'success',
            title: resultFactureFavoris.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.formFactureFavoris.reset();
          this.ngListFactureFavoris();
        } else {
          Swal.fire({
            tposition: 'top-end',
            icon: 'Error',
            title: resultFactureFavoris.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  }
  desactiverFactureFavoris(){
    this.factureFavoris.typeFacture=this.formFactureFavoris.value.typeFacture;
    this.factureFavoris.reference=this.formFactureFavoris.value.reference;
    this.factureFavoris.nomComplet=this.formFactureFavoris.value.nomComplet;
    this.factureFavoris.idClient=this.loginUser;
    this.factureFavoris.action=false;
    this.factureFavoris.statut=false;
    console.log(this.factureFavoris);
    Swal.fire({
      title: 'Souhaitez-vous activer ce favoris ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'OUI',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.factureFavorisService.savefacturefavoris(this.factureFavoris).subscribe((resultFactureFavoris:CustomResponse)=>{
          console.log(resultFactureFavoris);
          if (resultFactureFavoris.code==0) {
            Swal.fire({
              tposition: 'top-end',
              icon: 'success',
              title: resultFactureFavoris.message,
              showConfirmButton: false,
              timer: 1500
            })

            this.formFactureFavoris.reset();
            this.ngListFactureFavorisDesactiver();
            this.ngListFactureFavoris();
          } else {
            Swal.fire({
              tposition: 'top-end',
              icon: 'Error',
              title: resultFactureFavoris.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
        });

      }
    })

  }
  annulerFactureFavoris(){
    this.formFactureFavoris.reset();
  }
  onEdit(row: any) {
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
     */
  }

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
  }
}
