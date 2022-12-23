import { HttpClient } from '@angular/common/http';
import { Consultation } from './../../model/consultation.model';
import { FactureService } from './../../Services/facture.service';
import { Envoi } from 'src/app/model/envoi.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvoiserviceService } from 'src/app/Services/envoiservice.service';
import { Component, OnInit } from '@angular/core';
import { SearchfilterPipe } from 'src/app/searchfilter.pipe';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/Services/auth.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';
import { Comptemarchand } from 'src/app/model/comptemarchand.model';
import { ConsultationfactureService } from 'src/app/Services/consultationfacture.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css'],
})
export class ConsultationComponent implements OnInit {

  formCherche!: FormGroup;
  listeTransactions: Comptemarchand[];
  userConnect: string = localStorage.getItem('login');
  p: number = 1;

  constructor(
    private envoiService: FactureService,
    public datepipe: DatePipe,
    private httpClient: HttpClient,
    private authLogin: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private factureService: FactureService,
    private serviceConsul: ConsultationfactureService,
    public autoLogoutService: AutoLogoutService
  )

  {

  }

  ngOnInit() {
    this.formChercheTransact();
    this.getAllTransaction();

    this.autoLogoutService.infoUser(localStorage.getItem('login')).subscribe(
      (res) => {

        if (res != null) {
         // this.ListHistorique();

        } else {
          this.autoLogoutService.Logout(this.router);
          this.router.navigate(['/connexion'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }
      },
      (err) => {
        this.autoLogoutService.Logout(this.router);
        this.router.navigate(['/connexion'], {
          queryParams: { returnUrl: this.router.routerState.snapshot.url },
        });
      }
    );
  }

  getAllTransaction(){
    let refTran = this.formCherche.value.ref_transaction;
    let codeTran = this.formCherche.value.code_transaction;
    let dat_debut = this.formCherche.value.startDate;
    let dat_fin = this.formCherche.value.endDate;
    this.serviceConsul.getAllTransaction(this.userConnect,refTran,codeTran,dat_debut,dat_fin).subscribe({
      next:(data:Comptemarchand[])=>{
          this.listeTransactions=data;
      },
      error:(err)=>{
        console.log("Une erreur s'est produite");
      }
    });
  }

  formChercheTransact(){
    this.formCherche= this.fb.group({
      ref_transaction: this.fb.control(''),
      code_transaction: this.fb.control(''),
      startDate: this.fb.control(''),
      endDate: this.fb.control(''),
    }
    );
  }


}
