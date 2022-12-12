import { T24Transaction } from './../../model/t24Transaction.model';
import { envoiT24Transaction } from './../../model/envoiT24Transaction.model';
import { Consultation } from './../../model/consultation.model';
import { ListeConsul } from './../../model/listeConsultation.model';
import { Observable } from 'rxjs';
import { TransactionService } from './../../Services/transaction.service';
import { Paiement } from './../../model/paiement.model';
import { FactureService } from './../../Services/facture.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvoiserviceService } from './../../Services/envoiservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identifiant } from './../../model/identifiant.model';
import { Envoi } from './../../model/envoi.model';
import {
  FormGroup,
  FormBuilder,
  NgForm,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Facture } from './../../model/facture.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Transaction } from 'src/app/model/transaction.model';
import { Commissions } from 'src/app/model/commission.model';
import { ConsultationComponent } from '../consultation/consultation.component';
import { environment } from 'src/environments/environment';
import { ModeleFacture } from 'src/app/model/cieFacture.model';
import { ListeCIE } from 'src/app/model/ListeDesFacturesCie.model';
import { Cietransaction } from 'src/app/model/cietransaction.model';
import { TraitementCie } from 'src/app/model/traitementCie.model';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { timeout } from 'rxjs/operators';
import { Taille } from 'src/app/form';
import { AuthService } from 'src/app/Services/auth.service';
import { AutoLogoutService } from 'src/app/Services/auto-logout.service';
import { NouveauTransaction } from 'src/app/model/NewT24Transact.model';
import { ReglementSodeci } from 'src/app/model/ReglementSodeci.model';
import { EmissionSodeci } from 'src/app/model/EmissionSodeci.model';
import { ReglementCie } from 'src/app/model/ReglementCie.model';
import { AppComponent } from 'src/app/app.component';
import { ConsultationfactureService } from 'src/app/Services/consultationfacture.service';
import { CustomResponse } from 'src/app/model/custom-response';
import { IServiceEfactureService } from 'src/app/Services/iservice-efacture.service';
import { FactureFavorisService } from 'src/app/Services/facture-favoris.service';

@Component({
  selector: 'app-envoi-paiement-cie',
  templateUrl: './envoi-paiement-cie.component.html',
  styleUrls: ['./envoi-paiement-cie.component.css'],
})
export class EnvoiPaiementCieComponent implements OnInit {
  newId: any;
  id: any;
  noOper: any;
  identifiantHistorique: any;
  @ViewChild('modalTest') modalTest;
  @ViewChild('load') load;
  number: number;
  confirm: string;
  typeConfirmation: number;
  ErrorForm: FormGroup;
  show: boolean = false;
  show1: boolean = false;
  listeFactures: Facture;
  searchTerm: string;
  searchString: string;
  private deleteId: number;
  facturier = null;
  facturiers = [];
  closeResult: string;
  editForm: FormGroup;
  ConfirmForm: FormGroup;
  myForm: FormGroup;

  envois: Envoi[];
  allEnvois: Envoi[];
  testFacture: any;

  reponseT24: any;
  commissions: any;
  retour: any;
  mntTimbre: any;
  mntFrais: any;
  mntFraisMarchand: any;
  numCpt: any;
  consultation: any;
  identifiant = '';
  typeFact = '';
  identifiantFacture: Identifiant;
  paiementFacture: NouveauTransaction;
  facture: Facture;
  envoiis: Envoi;
  t24transaction: envoiT24Transaction;
  ReglementFactureSodeci: ReglementCie;
  historique: ListeConsul;
  ref: any;
  datePaiement: any;
  totalHisto: any;
  cie_sodeci: boolean = false;
  public statutT24: any;
  contrat: any;
  typePlafonnement: any;
  MessageTraitement: any;
  ReferenceContrat: any;
  AdresseTechnique: any;
  NombreFacture: any;
  MontantTotal: any;
  CodeTraitement: any;
  FactureSodeci: any;
  ListeFactureSodeci: number;
  errorMessage: any;
  stringJson: any;
  stringObject: any;
  cieTransaction: Cietransaction;
  ListeretourPaiementCie: any;
  maDate: any;
  NewDate: any;
  ReferenceT24: any;
  MailEnvoi: FormGroup;
  referenceCie: any;
  username: string;
  JsonServer: string = 'http://localhost:3000/FACTURE?AdresseTechnique=';
  erreurCode: boolean = false;
  mdp: any;
  otp: any;
  all: any;
  loginC: any;
  stringCompte: any;
  objCompte: any;
  Facture = {
    CodeTraitement: 1,
    MessageTraitement: 'SUCCES',
    ReferenceContrat: '024314767000',
    AdresseTechnique: '0240633900590',
    NombreFacture: 3,
    MontantTotal: 0.0,

    ListeDesFactures: [
      {
        CODE_TYP_FAC: 'EG',
        TYP_FAC: "Facture d'Emission Normale",
        PER_FAC: '03/2020',
        NUM_FAC: '000097870103202001',
        MONTANT_TOTAL: 8685,
        SOLDE_FACTURE: 6260,
        MONTANT_PENALITE: 2425,
        SIGNE: '+',
        DATE_LIMIT: '15/07/2020',
      },
      {
        CODE_TYP_FAC: 'ACC',
        TYP_FAC: 'Paiement par avance',
        PER_FAC: '12/2018',
        NUM_FAC: '000097870111201801',
        MONTANT_TOTAL: 8545,
        SOLDE_FACTURE: 8545,
        MONTANT_PENALITE: 0,
        SIGNE: '-',
        DATE_LIMIT: '',
      },
    ],
  };
  SODECIFACTURE1: any;
  FacturierCie: string = 'CIE';
  typeConfirm: any;
  Compteur: any;
  ComptTransacMax: any;
  ComptMontantMax: any;
  nbrMaxTransaction: any;
  nbrMaxMontant: any;
  Alltype: any;
  f: [];
  dat: any;
  mailEnvoyeur: any;
  collection = [];
  refExterne: any;
  paramCommissions: any;
  statutTransaction: string;
  historiqueFactureClient: CustomResponse;
  SODECIFACTURE: any=[];
  listFactureFavoris : any;
  myDropDown : string;
  activeFavoris: boolean;
  dactiveFavoris: boolean;
  refFavoris: any;
  showFavoris:boolean;
  constructor(
    private httpClient: HttpClient,
    private envoiService: EnvoiserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private factureService: FactureService,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    public autoLogoutService: AutoLogoutService,
    private consultationfactureService:ConsultationfactureService,
    private factureFavorisService:FactureFavorisService,
  ) {
    this.envoiis = new Envoi();
    this.identifiantFacture = new Identifiant();
    this.paiementFacture = new NouveauTransaction();
    this.numCpt = this.getComptes();
    this.facture = new Facture();
    this.historique = new ListeConsul();
    this.t24transaction = new envoiT24Transaction();
    this.cieTransaction = new Cietransaction();
    this.ReglementFactureSodeci = new ReglementCie();
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
    this.showFavoris= false;
  }

  ngAfterViewInit(): void {
    this.openModal();
  }
  toggleOut() {
    this.isShown = false;
  }
  ngOnInit() {
    this.autoLogoutService.infoUser(localStorage.getItem('login')).subscribe(
      (res) => {

        if (res) {
          this.httpClient
            .get<any>(environment.urlFinal + 'efacture/commissions')
            .subscribe((AllCommission) => {
              this.paramCommissions = AllCommission[0];

            });
          var dt = new Date();
          var t = moment(dt, 'dd-MM-yyyy HH:mm');


          this.dat = t.format('DD-MM-YYYY HH-mm-ss');

          this.loginC = localStorage.getItem('login');

          this.getComptes();
          this.httpClient
            .get(
              environment.urlFinal +
                'efacture/consultation/compteur/' +
                localStorage.getItem('login') +
                '/' +
                this.datePipe.transform(new Date(), 'yyyy-MM-dd')
            )
            .subscribe(
              (cmpt) => {

                this.ComptTransacMax = cmpt;
              },
              (err) => {
                this.autoLogoutService.autoLogout(err.status, this.router);
              }
            );
          this.httpClient
            .get(
              environment.urlFinal +
                'efacture/consultation/compteurMtn/' +
                localStorage.getItem('login') +
                '/' +
                this.datePipe.transform(new Date(), 'yyyy-MM-dd')
            )
            .subscribe(
              (cmptMtn) => {

                this.ComptMontantMax = cmptMtn;
              },
              (err) => {
                this.autoLogoutService.autoLogout(err.status, this.router);
              }
            );
          this.type();
          this.typeConfirmation = Number(
            localStorage.getItem('authtypeConfirm')
          );
          this.confirm = localStorage.getItem('confirmationTransation');
          this.username = localStorage.getItem('username');
          compte: [0];
          this.httpClient.get('').subscribe(
            (data) => {
              this.facturiers = data as string[];
            },
            (err) => {
              this.autoLogoutService.autoLogout(err.status, this.router);
            }
          );

          this.myForm = this.fb.group({
            identifiant: [
              '',
              [Validators.required, Taille],
              [Validators.minLength(9)],
              ,
              [Validators.maxLength(9)],
            ],
          });

          this.ConfirmForm = this.fb.group({
            motDePasse: [''],
            otpfield: [''],
          });

          this.editForm = this.fb.group({
            id: [''],
            identifiant: [''],
            dateLimiteFact: [''],
            nombreFact: [''],
            impayeFact: [''],
            numCpt: [''],
            typeFact: [''],
            montantPaye: [''],
            intituleFacturier: [''],
            montantFacture: [''],
            typePaye: [''],
            periode: [''],
            penalite: [''],
          });
          this.httpClient
            .get(environment.urlFinal + 'efacture/commission/' + 'CIE/' + 2500)
            .subscribe((da) => {
              var i;
              for (i in da) {

              }

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
    this.ngListFactureFavoris();
    this.activeFavoris=false;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get g(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  type() {
    this.httpClient
      .get(
        environment.urlFinal +
          'efacture/plafond/plafondType/' +
          localStorage.getItem('authtypePlanfond')
      )
      .subscribe(
        (type) => {
          this.Alltype = type[0];
          this.nbrMaxMontant = this.Alltype.montantMax;
          this.nbrMaxTransaction = this.Alltype.nombreFacture;

        },
        (err) => {
          this.autoLogoutService.autoLogout(err.status, this.router);
        }
      );
  }
  onSubmit(envoi: Envoi): Observable<any> {
    const url = environment.urlFinal + 'efacture/paie/paiement';
    return this.httpClient.post<Facture>(url, envoi);
  }

  Envoyeur() {
    this.httpClient.get(environment.urlFinal + 'efacture/emails').subscribe(
      (mails: any) => {

        // //'raouf.kone@banqueatlantique.net'
      },
      (err) => {
        this.autoLogoutService.autoLogout(err.status, this.router);
      }
    );
  }

  getReference() {
    return this.ref;
  }

  getComptes() {
    this.httpClient
      .get(
        environment.urlFinal +
          'efacture/comptes/getCompteByStatut/' +
          localStorage.getItem('login')
      )
      .subscribe(
        (res: any) => {
          var z;

          this.stringCompte = JSON.stringify(res);
          this.objCompte = JSON.parse(this.stringCompte);
          for (z in this.objCompte) {
            this.f = this.objCompte[z].compte;


          }
        },
        (err) => {
          this.autoLogoutService.autoLogout(err.status, this.router);
        }
      );
    return this.objCompte;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openConfirm(modalConfirm) {
    if (
      this.ComptTransacMax < this.nbrMaxTransaction &&
      this.ComptMontantMax <= this.nbrMaxMontant
    ) {
      this.typeConfirmation = Number(localStorage.getItem('authtypeConfirm'));

      this.modalService
        .open(modalConfirm, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );

      if (this.typeConfirmation === 1) {
        this.httpClient
          .get<any>(environment.urlFinal + 'efacture/user/mdp/generer')
          .subscribe(
            (otpmdp) => {

              localStorage.setItem('OtpCode', otpmdp.code);
              this.otp = localStorage.getItem('OtpCode');


              if (otpmdp) {
                var mdp = localStorage.getItem('OtpCode');
                this.MailEnvoi = this.fb.group({
                 // expediteur: localStorage.getItem('expediteur'),
                  destinataire: localStorage.getItem('email'),
                  objet: 'CODE DE CONFIRMATION TRANSACTION EFACTURE',
                  message:
                    'Bonjour' +
                    ' ' +
                    localStorage.getItem('prenom') +
                    '\n' +
                    'Votre code de confirmation de transaction est:' +
                    ' ' +
                    mdp +
                    '\n' +
                    "Ignorez cet e-mail si vous n'aviez pas initié de transaction, ",
                });
                //
                this.factureService.EnvoiMail(this.MailEnvoi.value).subscribe(
                  (data) => {
                    this.factureService.GetAll().subscribe(
                      (response) => {
                        this.factureService.list = response;
                      },
                      (err) => {
                        this.autoLogoutService.autoLogout(
                          err.status,
                          this.router
                        );
                      }
                    );
                  },
                  (error) => {

                    this.ErrorForm = this.fb.group({
                      httpStatusCode: '400',
                      methode: 'CheckId',
                      login: localStorage.getItem('login'),
                      message: JSON.stringify(error.message),
                      description: JSON.stringify(error.name),
                    });
                    this.factureService
                      .Envoierror(this.ErrorForm.value)
                      .subscribe((res) => {


                      });
                    this.autoLogoutService.autoLogout(
                      error.status,
                      this.router
                    );
                  }
                );
              }
            },
            (err) => {
              this.autoLogoutService.autoLogout(err.status, this.router);
            }
          );

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success ml-2',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: 'Code de Confirmation',
            // text: 'Vous allez reçevoir un code confirmation sur votre boîte mail, Veuillez mentionner celui-ci sur l\'écran suivant',
            icon: 'warning',
            html: "<center>Vous allez reçevoir un code confirmation sur votre boîte mail<br>Veuillez mentionner celui-ci sur l'écran suivant</center>",
            confirmButtonText: 'OK',
            cancelButtonText: "Annuler l'opération",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
            }
          });
      }
    } else {
      Swal.fire({
        title: 'Attention',
        text: 'Veuillez réessayer plutard!',
        html:
          '<center>Vous avez atteint votre quota journalier de transaction<br>NB: Nombre Maximum de transaction = ' +
          this.nbrMaxTransaction +
          '<br>' +
          'Montant Maximum de paiement= ' +
          this.nbrMaxMontant +
          'Fcfa' +
          '</center>',
        icon: 'warning',
        footer: '<a href="/Choix_facturier">Rechercher une autre facture?</a>',
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalService.dismissAll();
          this.router.navigate(['home']);
          this.ngOnInit();
        }
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openEdit1(targetModal, _facture: ListeCIE) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'xl',
    });
    this.editForm.patchValue({
      identifiant: _facture.NUM_FAC,
      periode: _facture.PER_FAC,
      dateLimiteFact: _facture.DATE_LIMIT,
      montantFacture: _facture.MONTANT_TOTAL,
      penalite: _facture.MONTANT_PENALITE,
    });
  }

  openEdit(targetModal, _facture: EmissionSodeci) {
    localStorage.setItem('idabon', _facture.idabon);
    localStorage.setItem('perfact', _facture.perfact);
    var per = _facture.perfact.slice(0, 2) + '/' + _facture.perfact.slice(2);
    var e = _facture.montfraisp;
    var z = +e;
    var x = _facture.montttc;
    var y = +x;

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'xl',
    });
    this.editForm.patchValue({
      identifiant: _facture.numfact,
      periode: per,
      dateLimiteFact: this.datePipe.transform(_facture.datlimit, 'dd/MM/yyyy'),
      penalite: z,
      montantFacture: y + z,
    });
  }

  isShown: boolean = false;
  loader: boolean = false;
  toggleShow() {
    this.isShown = !this.isShown;
  }
  openModal() {
    this.modalService.open(this.modalTest, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    });
  }
  openModal1() {
    this.modalService.open(this.load, {
      backdrop: 'static',
      size: '',
      centered: true,
    });
  }

  CheckId() {
    console.log('testFacture');
    console.log(this.identifiant);

    this.id = this.identifiant;
    this.newId = this.id * 1;

    var RefContrat = this.identifiant;
    localStorage.setItem('refContrat', this.id);
    this.modalService.dismissAll();
    this.cie_sodeci = true;

    this.httpClient
      .get(environment.urlFinal + 'Api/facture/cie/' + this.identifiant)
      // .get(this.JsonServer + this.identifiant)
      .subscribe(
        (testFacture: any) => {
          console.log('testFacture');
          console.log(testFacture);
          console.log('testFacture');
          console.log(JSON.stringify(testFacture))
          if(testFacture.CodeTraitement == 1){
            this.ErrorForm = this.fb.group({
              httpStatusCode: '400',
              methode: 'CheckId',
              login: localStorage.getItem('login'),
              message: JSON.stringify(testFacture),
              description: 'Service de consultation CIE/SODECI injoignable',
            });

            this.factureService
            .Envoierror(this.ErrorForm.value)
            .subscribe((res) => {});
            this.show = false;
              this.show1 = false;
              this.modalService.dismissAll();
              Swal.fire({
                title: 'Désole!',
                html: '<center>Service injoignable</center>',
                iconHtml:
                  '<img style="width:313px; margin-top: 34px;" src="assets/duo.png">',
                customClass: {
                  icon: 'no-border',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['Choix_facturier']);
                }
              });
          }
          this.contrat = testFacture.ReferenceContrat;

          var njson = JSON.stringify(testFacture.ListeDesFactures);
          this.stringObject = JSON.parse(njson);
          console.log('consultation111111111111111111');
          console.log(this.stringObject);
          console.log('consultation111111111111111111');
          this.SODECIFACTURE1 = this.stringObject;
          console.log('consultation');
          console.log(this.SODECIFACTURE1);
          console.log('consultation');
          if (this.SODECIFACTURE1 !=null) {
            this.SODECIFACTURE1.forEach(CiefactureUnique => {
              console.log(CiefactureUnique.NUM_FAC);
              this.consultationfactureService.getFactureByNumeroFacture(CiefactureUnique.NUM_FAC).subscribe((res:CustomResponse)=>{
                  console.log('consultation');
                  console.log(res);

                  this.historiqueFactureClient=res;
                  if (this.historiqueFactureClient.code==0) {
                    this.SODECIFACTURE.push(CiefactureUnique);
                    console.log('fact');
                      console.log(this.SODECIFACTURE);
                    console.log('fact');
                  }
                  console.log('consultation');
                });
           });
          }

          // for (var CiefactureUnique of this.SODECIFACTURE1) {
          //   console.log(CiefactureUnique.NUM_FAC);
          //   this.consultationfactureService.getFactureByNumeroFacture(CiefactureUnique.NUM_FAC).subscribe((res:CustomResponse)=>{
          //       console.log('consultation');
          //       console.log(res);

          //       this.historiqueFactureClient=res;
          //       if (this.historiqueFactureClient.code==0) {
          //         this.SODECIFACTURE.push(CiefactureUnique);
          //         console.log('fact');
          //           console.log(this.SODECIFACTURE);
          //         console.log('fact');
          //       }
          //       console.log('consultation');
          //     });
          // }
          // console.log('fact');
          // console.log(this.SODECIFACTURE);
          // console.log('fact');
          this.ListeFactureSodeci = testFacture.CodeTraitement;
          console.log(this.SODECIFACTURE1);
          console.log('client');
          console.log(localStorage.getItem('rcCLient'));
          console.log('client');
          // this.consultationfactureService.getConsultationBylogin(localStorage.getItem('rcCLient')).subscribe(res=>{
          //   console.log('consultation');
          //   console.log(res);

          //   this.historiqueFactureClient=res;

          //   console.log('consultation');
          // });
          console.log('this.historiqueFactureClient');
          console.log(this.historiqueFactureClient);
          console.log('this.historiqueFactureClient');
          var rf: any = testFacture.ReferenceContrat;

          this.cie_sodeci = false;
          /**************************************************************************************************** */
          /**************************************************************************************************** */
          /**************************************************************************************************** */
          /**************************************************************************************************** */
          /**************************************************************************************************** */
          /**************************************************************************************************** */

          switch (this.ListeFactureSodeci) {

            case 0:
              this.show = true;
              this.show1 = true;
              this.modalService.dismissAll();
              break;
            case 10:
              this.show = false;
              this.show1 = false;
              this.modalService.dismissAll();
              Swal.fire({
                title: 'Désole!',
                html: '<center>Référence du contrat non fournie</center>',
                iconHtml:
                  '<img style="width:313px; margin-top: 34px;" src="assets/duo_Cie.png">',
                customClass: {
                  icon: 'no-border',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['Choix_facturier']);
                }
              });
              break;
            case 11:
              this.show = false;
              this.show1 = false;
              this.modalService.dismissAll();
              Swal.fire({
                title: 'Désole!',
                html: '<center>Client inexistant</center>',
                iconHtml:
                  '<img style="width:313px; margin-top: 34px;" src="assets/duo_Cie.png">',
                customClass: {
                  icon: 'no-border',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['Choix_facturier']);
                }
              });
              break;
            case 12:
              this.show = false;
              this.show1 = false;
              this.modalService.dismissAll();
              Swal.fire({
                title: 'Désole!',
                html: '<center>Client sans facture</center>',
                iconHtml:
                  '<img style="width:313px; margin-top: 34px;" src="assets/duo_Cie.png">',
                customClass: {
                  icon: 'no-border',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['Choix_facturier']);
                }
              });
              break;
            case 15:
              this.show = false;
              this.show1 = false;
              this.modalService.dismissAll();
              Swal.fire({
                title: 'Désole!',
                html: '<center>Echec dans le traitement</center>',
                iconHtml:
                  '<img style="width:313px; margin-top: 34px;" src="assets/duo_Cie.png">',
                customClass: {
                  icon: 'no-border',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['Choix_facturier']);
                }
              });
              break;
          }
        },
        (error) => {
          this.errorMessage = error;
          this.show = false;
          this.show1 = false;
          this.cie_sodeci = false;
          this.ErrorForm = this.fb.group({
            httpStatusCode: '400',
            methode: 'CheckId',
            login: localStorage.getItem('login'),
            message: JSON.stringify(error.message),
            description: JSON.stringify(error.name),
          });
          this.factureService
            .Envoierror(this.ErrorForm.value)
            .subscribe((res) => {});
          Swal.fire({
            title: 'Erreur!',
            text: 'Impossible de joindre le lien',
            icon: 'warning',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['home']);
            }
          });
          this.autoLogoutService.autoLogout(error.status, this.router);
        }
      );
  }

  OperationPaie() {
    console.log('Operation')
    this.mdp = this.ConfirmForm.value.motDePasse;
    if (
      this.ConfirmForm.value.motDePasse == this.confirm ||
      this.ConfirmForm.value.otpfield == this.otp
    ) {
      this.show1 = false;
      this.loader = true;
      this.modalService.dismissAll();
      var numero = this.editForm.value.numCpt;
      var typeReglement = this.editForm.value.typePaye;
      var expirationDate = this.editForm.value.dateLimiteFact;
      var montantFacture = this.editForm.value.montantFacture;
      var montant;
      if (typeReglement === 'Total') {
        montant = this.editForm.value.montantFacture;
      } else {
        montant = this.editForm.value.montantPaye;
      }
      var montantPaye = this.editForm.value.montantPaye;
      console.log(montant);
      this.statutTransaction = 'Initité';
      this.transactionService.getCommissionByClient(localStorage.getItem('rcCLient')).subscribe(res => {
        console.log(res);
        this.commissions=res;
        console.log(this.commissions);
        ////////////////-------------------------test--------------------------
        for (let commission of this.commissions) {
            if (commission.facturier=='CIE') {
              if (montant>=commission.mntMin && montant<=commission.mntMax) {
                console.log(commission.mntMin);
                console.log(commission.mntMax);
                ////////////////----------------------------------------------------------------
                  var rc = localStorage.getItem('rcCLient');
                  this.paiementFacture.client = rc;
                  (this.paiementFacture.compteDebit = this.editForm.value.numCpt),
                    (this.paiementFacture.facturier = this.FacturierCie);
                  this.paiementFacture.identifiantFacture =
                    this.editForm.value.identifiant;
                  if (typeReglement === 'Total') {
                    this.paiementFacture.mntOper =
                      this.editForm.value.montantFacture * 1 +
                      this.commissions.montantCommission +
                      this.commissions.commissionFacturier +
                      this.commissions.mntTimbre;
                    this.paiementFacture.mntFacture =
                      this.editForm.value.montantFacture;
                  } else {
                    this.paiementFacture.mntOper =
                      this.editForm.value.montantPaye * 1 +
                      this.commissions.montantCommission +
                      this.commissions.commissionFacturier +
                      this.commissions.mntTimbre;
                    this.paiementFacture.mntFacture =
                      this.editForm.value.montantPaye;
                  }
                  this.paiementFacture.mntFrais = this.commissions.commissionBanque;
                  (this.paiementFacture.mntFraisMarchand =
                    this.commissions.commissionFacturier),
                    (this.paiementFacture.mntTimbre = this.commissions.mntTimbre),
                    this.transactionService
                      .Transaction(this.paiementFacture)
                      .subscribe(
                        (T24: any) => {
                          console.log(T24)
                          this.reponseT24 = T24;
                          this.ReferenceT24 = this.reponseT24.Nooper;
                          this.noOper = T24.Nooper;
                          this.refExterne = T24.refExterne;
                          localStorage.setItem('refExterne', this.refExterne);

                          if (this.reponseT24.statut === 1) {
                            swalWithBootstrapButtons.fire(
                              'Echec',
                              'Votre paiement a échoué !',
                              'error'
                            );
                            this.ngOnInit();
                            this.router.navigate(['home']);
                          }

                          if (this.reponseT24.statut === 0) {
                            this.statutTransaction = 'En Attente';

                            // 2EME ETAPE ***PAYEMENT CIE*** //

                            //DATE PAIEMENT//
                            var madate = new Date();
                            var Dates = madate.toLocaleString('fr-FR', {
                              month: 'numeric',
                              day: 'numeric',
                              year: 'numeric',
                            });
                            var Datess = Dates.toString();
                            var Date_finale = Datess.replace(/\//g, '');

                            this.cieTransaction.DateReglement = Date_finale;

                            if (typeReglement === 'Total') {
                              this.cieTransaction.MontantReglement =
                                this.editForm.value.montantFacture;
                            } else {
                              this.cieTransaction.MontantReglement =
                                this.editForm.value.montantPaye;
                            }

                            //HEURE PAIEMENT//

                            var heure = new Date();
                            var cie = heure.toLocaleString('fr-FR', {
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                              hour12: false,
                            });
                            var heureEnvoi = cie.toString();
                            var Heure_finale = heureEnvoi.replace(/:/g, '');

                            //SEND PARAMS TO CIE
                            this.cieTransaction.CodeOperateur =
                              this.paramCommissions.codeOperateur;

                            this.cieTransaction.HeureReglement = Heure_finale;

                            this.cieTransaction.NumeroRecu = this.ReferenceT24;

                            this.cieTransaction.RefContrat = this.contrat;

                            this.cieTransaction.RefFacture =
                              this.editForm.value.identifiant;

                            this.cieTransaction.TypeCanal =
                              this.paramCommissions.typeCanal;

                            this.transactionService
                              .TransactionCie(this.cieTransaction)
                              .subscribe((retourPaiementCie: TraitementCie) => {
                                this.ListeretourPaiementCie = retourPaiementCie;

                                /////////////////////INSERTION TABLE CONSULTATION/////////////////////////
                                if (
                                  this.ListeretourPaiementCie.CodeTraitement === 0
                                ) {
                                  this.statutTransaction = 'Succès';

                                  this.historique.identifiant =
                                    localStorage.getItem('refContrat');
                                    this.historique.numeroFacture=this.editForm.value.identifiant
                                  this.historique.dtExpFacture = expirationDate;
                                  this.historique.login = this.loginC;
                                  this.historique.facturier = this.FacturierCie;
                                  this.historique.referenceFT = this.noOper;

                                  this.historique.reference =
                                    this.ListeretourPaiementCie.ReferenceDeTransaction;
                                  this.historique.referenceExt = this.refExterne;
                                  this.historique.numCpt = numero;
                                  this.historique.typeRegle = typeReglement;
                                  if (typeReglement === 'Total') {
                                    this.historique.montantDebite = montantFacture;
                                  } else {
                                    this.historique.montantDebite = montantPaye;
                                  }
                                  this.historique.statut = this.statutTransaction;

                                  this.factureService
                                    .AddHistorique(this.historique)
                                    .subscribe(
                                      (histfacture: Consultation) => {
                                        if (histfacture) {
                                          /////////////////////INSERTION TABLE TRANSACTION ///////////////////////////////////////

                                          this.t24transaction.facturier =
                                            this.FacturierCie;
                                          this.t24transaction.datOper =
                                            this.datePaiement;
                                          this.t24transaction.codOper =
                                            this.paramCommissions.codOper;
                                          this.t24transaction.identifiantFacture =
                                            this.editForm.value.identifiant;
                                          this.t24transaction.compteCredit = '';
                                          this.t24transaction.compteDebit =
                                            this.editForm.value.numCpt;
                                          if (
                                            this.editForm.value.typePaye === 'Total'
                                          ) {
                                            this.t24transaction.mntOper =
                                              this.editForm.value.montantFacture;
                                          } else {
                                            this.t24transaction.mntOper =
                                              this.editForm.value.montantPaye;
                                          }
                                          this.t24transaction.mntFacture =
                                            this.editForm.value.montantFacture;
                                          this.t24transaction.mntFrais =
                                            this.paiementFacture.mntFrais;
                                          this.t24transaction.mntFraisMarchand =
                                            this.commissions.mntFraisMarchand;
                                          this.t24transaction.mntMarchand =
                                            this.commissions.mntMarchand;
                                          this.t24transaction.mntTimbre =
                                            this.commissions.mntTimbre;
                                          this.t24transaction.libelleOper =
                                            'PAIEMENT FACTURE' +
                                            '_' +
                                            this.paiementFacture.facturier +
                                            '_' +
                                            this.paiementFacture
                                              .identifiantFacture +
                                            '_' +
                                            this.paiementFacture.mntOper;
                                          this.t24transaction.compteCom = '1';
                                          this.t24transaction.codeTraitement = 0;
                                          this.t24transaction.statutTraitement =
                                            this.statutTransaction;

                                          this.factureService
                                            .AddTransaction(this.t24transaction)
                                            .subscribe(
                                              (t24Response) => {
                                                if (t24Response) {
                                                  ////////////////////////////////////// INSERTION TABLE PAIEMENT//////////////////////////////////////////
                                                  this.envoiis.identifiant =
                                                    this.editForm.value.identifiant;
                                                  this.envoiis.montantFacture =
                                                    this.editForm.value.montantFacture;
                                                  this.envoiis.intituleFacturier =
                                                    this.FacturierCie;
                                                  if (
                                                    this.editForm.value.typePaye ===
                                                    'Total'
                                                  ) {
                                                    this.envoiis.montantPaye =
                                                      this.editForm.value.montantFacture;
                                                  } else {
                                                    this.envoiis.montantPaye =
                                                      this.editForm.value.montantPaye;
                                                  }

                                                  this.envoiis.numCpt =
                                                    this.editForm.value.numCpt;
                                                  this.envoiis.typePaye =
                                                    this.editForm.value.typePaye;
                                                  this.envoiis.reference =
                                                    this.noOper;
                                                  this.envoiis.codeReponse =
                                                    this.refExterne;
                                                  this.envoiis.frais =
                                                    this.commissions.montantCommission;
                                                  this.envoiis.timbre =
                                                    this.commissions.mntTimbre;

                                                  this.onSubmit(
                                                    this.envoiis
                                                  ).subscribe(
                                                    (paiement: Facture) => {
                                                      if (paiement) {
                                                        swalWithBootstrapButtons.fire(
                                                          'Succès',
                                                          'Votre paiement a bien été effectué!',
                                                          'success'
                                                        );

                                                        this.ngOnInit();
                                                        this.router.navigate([
                                                          'home',
                                                        ]);
                                                      }
                                                    },
                                                    (error) => {
                                                      this.autoLogoutService.autoLogout(
                                                        error.status,
                                                        this.router
                                                      );

                                                      this.loader = false;
                                                      this.ErrorForm =
                                                        this.fb.group({
                                                          httpStatusCode: '401',
                                                          methode:
                                                            'Add To Table Paiement',
                                                          login:
                                                            localStorage.getItem(
                                                              'login'
                                                            ),
                                                          message: JSON.stringify(
                                                            error.name
                                                          ),
                                                          description:
                                                            JSON.stringify(
                                                              error.message
                                                            ) +
                                                            '\n' +
                                                            JSON.stringify(
                                                              error.error
                                                            ),
                                                        });
                                                      this.factureService
                                                        .Envoierror(
                                                          this.ErrorForm.value
                                                        )
                                                        .subscribe((res) => {});

                                                      Swal.fire({
                                                        title: 'Echec!',
                                                        text: 'Veuillez réessayer plutard!',
                                                        html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
                                                        icon: 'error',
                                                      }).then((result) => {
                                                        if (result.isConfirmed) {
                                                          this.ngOnInit();
                                                          this.router.navigate([
                                                            'home',
                                                          ]);
                                                        }
                                                      });
                                                    }
                                                  );
                                                  //************////****************FIN INSERTION TABLE PAIEMENT***********////////////**////***********
                                                }
                                              },
                                              (error) => {

                                                this.loader = false;
                                                this.ErrorForm = this.fb.group({
                                                  httpStatusCode: '401',
                                                  methode:
                                                    'Add To Transaction Table',
                                                  login:
                                                    localStorage.getItem('login'),
                                                  message: JSON.stringify(
                                                    error.name
                                                  ),
                                                  description:
                                                    JSON.stringify(error.message) +
                                                    '\n' +
                                                    JSON.stringify(error.error),
                                                });
                                                this.factureService
                                                  .Envoierror(this.ErrorForm.value)
                                                  .subscribe((res) => {

                                                  });

                                                Swal.fire({
                                                  title: 'Echec!',
                                                  text: 'Veuillez réessayer plutard!',
                                                  html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
                                                  icon: 'error',
                                                }).then((result) => {
                                                  if (result.isConfirmed) {
                                                    this.ngOnInit();
                                                    this.router.navigate(['home']);
                                                  }
                                                });
                                                this.autoLogoutService.autoLogout(
                                                  error.status,
                                                  this.router
                                                );
                                              }
                                            );
                                          //************////****************FIN INSERTION TABLE TRANSACTION***********////////////**////***********


                                        } else {

                                        }
                                      },
                                      (error) => {

                                        this.loader = false;
                                        this.ErrorForm = this.fb.group({
                                          httpStatusCode: '401',
                                          methode: 'Add To Table Consultation',
                                          login: localStorage.getItem('login'),
                                          message: JSON.stringify(error.name),
                                          description:
                                            JSON.stringify(error.message) +
                                            '\n' +
                                            JSON.stringify(error.error),
                                        });
                                        this.factureService
                                          .Envoierror(this.ErrorForm.value)
                                          .subscribe((res) => {


                                          });

                                        Swal.fire({
                                          title: 'Echec!',
                                          text: 'Veuillez réessayer plutard!',
                                          html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
                                          icon: 'error',
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            this.ngOnInit();
                                            this.router.navigate(['home']);
                                          }
                                        });
                                        this.autoLogoutService.autoLogout(
                                          error.status,
                                          this.router
                                        );
                                      }
                                    );

                                  //************////****************FIN INSERTION TABLE CONSULTATION***********////////////**////***********
                                } else {
                                  this.historique.identifiant =
                                    localStorage.getItem('refContrat');

                                  this.historique.dtExpFacture = expirationDate;
                                  this.historique.login = this.loginC;
                                  this.historique.facturier = this.FacturierCie;
                                  this.historique.referenceFT = this.noOper;

                                  this.historique.reference =
                                    this.ListeretourPaiementCie.ReferenceDeTransaction;
                                  this.historique.referenceExt = this.refExterne;
                                  this.historique.numCpt = numero;
                                  this.historique.typeRegle = typeReglement;
                                  if (typeReglement === 'Total') {
                                    this.historique.montantDebite = montantFacture;
                                  } else {
                                    this.historique.montantDebite = montantPaye;
                                  }
                                  this.historique.statut = 'En attente';

                                  this.factureService
                                    .AddHistorique(this.historique)
                                    .subscribe(
                                      (histfacture: Consultation) => {

                                        if (histfacture) {
                                          /////////////////////INSERTION TABLE TRANSACTION ///////////////////////////////////////

                                          this.t24transaction.facturier =
                                            this.FacturierCie;
                                          this.t24transaction.datOper =
                                            this.datePaiement;
                                          this.t24transaction.codOper =
                                            this.paramCommissions.codOper;
                                          this.t24transaction.identifiantFacture =
                                            this.editForm.value.identifiant;
                                          this.t24transaction.compteCredit = '';
                                          this.t24transaction.compteDebit =
                                            this.editForm.value.numCpt;
                                          if (
                                            this.editForm.value.typePaye === 'Total'
                                          ) {
                                            this.t24transaction.mntOper =
                                              this.editForm.value.montantFacture;
                                          } else {
                                            this.t24transaction.mntOper =
                                              this.editForm.value.montantPaye;
                                          }
                                          this.t24transaction.mntFacture =
                                            this.editForm.value.montantFacture;
                                          this.t24transaction.mntFrais =
                                            this.paiementFacture.mntFrais;
                                          this.t24transaction.mntFraisMarchand =
                                            this.commissions.mntFraisMarchand;
                                          this.t24transaction.mntMarchand =
                                            this.commissions.mntMarchand;
                                          this.t24transaction.mntTimbre =
                                            this.commissions.mntTimbre;
                                          this.t24transaction.libelleOper =
                                            'PAIEMENT FACTURE' +
                                            '_' +
                                            this.paiementFacture.facturier +
                                            '_' +
                                            this.paiementFacture
                                              .identifiantFacture +
                                            '_' +
                                            this.paiementFacture.mntOper;
                                          this.t24transaction.compteCom = '1';
                                          this.t24transaction.codeTraitement = 0;
                                          this.t24transaction.statutTraitement =
                                            'En attente';

                                          this.factureService
                                            .AddTransaction(this.t24transaction)
                                            .subscribe(
                                              (t24Response) => {

                                                if (t24Response) {
                                                  ////////////////////////////////////// INSERTION TABLE PAIEMENT//////////////////////////////////////////
                                                  this.envoiis.identifiant =
                                                    this.editForm.value.identifiant;


                                                  this.envoiis.montantFacture =
                                                    this.editForm.value.montantFacture;
                                                  this.envoiis.intituleFacturier =
                                                    this.FacturierCie;
                                                  if (
                                                    this.editForm.value.typePaye ===
                                                    'Total'
                                                  ) {
                                                    this.envoiis.montantPaye =
                                                      this.editForm.value.montantFacture;
                                                  } else {
                                                    this.envoiis.montantPaye =
                                                      this.editForm.value.montantPaye;
                                                  }

                                                  this.envoiis.numCpt =
                                                    this.editForm.value.numCpt;

                                                  this.envoiis.typePaye =
                                                    this.editForm.value.typePaye;
                                                  this.envoiis.reference =
                                                    this.noOper;
                                                  this.envoiis.codeReponse =
                                                    this.refExterne;
                                                  this.envoiis.frais =
                                                    this.commissions.montantCommission;
                                                  this.envoiis.timbre =
                                                    this.commissions.mntTimbre;


                                                  this.onSubmit(
                                                    this.envoiis
                                                  ).subscribe(
                                                    (paiement: Facture) => {

                                                      if (paiement) {
                                                      }
                                                    },
                                                    (error) => {
                                                      this.autoLogoutService.autoLogout(
                                                        error.status,
                                                        this.router
                                                      );


                                                      this.loader = false;
                                                      this.ErrorForm =
                                                        this.fb.group({
                                                          httpStatusCode: '401',
                                                          methode:
                                                            'Add To Table Paiement',
                                                          login:
                                                            localStorage.getItem(
                                                              'login'
                                                            ),
                                                          message: JSON.stringify(
                                                            error.name
                                                          ),
                                                          description:
                                                            JSON.stringify(
                                                              error.message
                                                            ) +
                                                            '\n' +
                                                            JSON.stringify(
                                                              error.error
                                                            ),
                                                        });
                                                      this.factureService
                                                        .Envoierror(
                                                          this.ErrorForm.value
                                                        )
                                                        .subscribe((res) => {

                                                        });

                                                      Swal.fire({
                                                        title: 'Echec!',
                                                        text: 'Veuillez réessayer plutard!',
                                                        html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
                                                        icon: 'error',
                                                      }).then((result) => {
                                                        if (result.isConfirmed) {
                                                          this.ngOnInit();
                                                          this.router.navigate([
                                                            'home',
                                                          ]);
                                                        }
                                                      });
                                                    }
                                                  );
                                                  //************////****************FIN INSERTION TABLE PAIEMENT***********////////////**////***********
                                                }
                                              },
                                              (error) => {

                                                this.loader = false;
                                                this.ErrorForm = this.fb.group({
                                                  httpStatusCode: '401',
                                                  methode:
                                                    'Add To Transaction Table',
                                                  login:
                                                    localStorage.getItem('login'),
                                                  message: JSON.stringify(
                                                    error.name
                                                  ),
                                                  description:
                                                    JSON.stringify(error.message) +
                                                    '\n' +
                                                    JSON.stringify(error.error),
                                                });
                                                this.factureService
                                                  .Envoierror(this.ErrorForm.value)
                                                  .subscribe((res) => {


                                                  });

                                                Swal.fire({
                                                  title: 'Echec!',
                                                  text: 'Veuillez réessayer plutard!',
                                                  html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
                                                  icon: 'error',
                                                }).then((result) => {
                                                  if (result.isConfirmed) {
                                                    this.ngOnInit();
                                                    this.router.navigate(['home']);
                                                  }
                                                });
                                                this.autoLogoutService.autoLogout(
                                                  error.status,
                                                  this.router
                                                );
                                              }
                                            );
                                          //************////****************FIN INSERTION TABLE TRANSACTION***********////////////**////***********
                                        } else {

                                        }
                                      },
                                      (error) => {

                                        this.loader = false;
                                        this.ErrorForm = this.fb.group({
                                          httpStatusCode: '401',
                                          methode: 'Add To Table Consultation',
                                          login: localStorage.getItem('login'),
                                          message: JSON.stringify(error.name),
                                          description:
                                            JSON.stringify(error.message) +
                                            '\n' +
                                            JSON.stringify(error.error),
                                        });
                                        this.factureService
                                          .Envoierror(this.ErrorForm.value)
                                          .subscribe((res) => {


                                          });

                                        Swal.fire({
                                          title: 'Echec!',
                                          text: 'Veuillez réessayer plutard!',
                                          html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
                                          icon: 'error',
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            this.ngOnInit();
                                            this.router.navigate(['home']);
                                          }
                                        });
                                        this.autoLogoutService.autoLogout(
                                          error.status,
                                          this.router
                                        );
                                      }
                                    );

                                  swalWithBootstrapButtons.fire(
                                    'Succès',
                                    'Votre paiement a bien été effectué!',
                                    'success'
                                  );

                                  this.ngOnInit();
                                  this.router.navigate(['home']);
                                }
                              });


                          } else {
                            swalWithBootstrapButtons.fire(
                              'Echec',
                              '<center>Votre paiement a échoué!<br>' +
                                this.noOper +
                                '</center>',
                              'error'
                            );
                            this.ngOnInit();
                            this.router.navigate(['home']);

                          }
                        },
                        (error) => {

                          this.loader = false;
                          this.ErrorForm = this.fb.group({
                            httpStatusCode: '401',
                            methode: 'OperationPaie T24',
                            login: localStorage.getItem('login'),
                            message: 'T24 indisponible',
                            description:
                              JSON.stringify(error.message) +
                              '\n' +
                              JSON.stringify(error.error),
                          });
                          this.factureService
                            .Envoierror(this.ErrorForm.value)
                            .subscribe((res) => {


                            });

                          Swal.fire({
                            title: 'Echec!',
                            text: 'Veuillez réessayer plutard!',
                            html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
                            icon: 'error',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              this.ngOnInit();
                              this.router.navigate(['home']);
                            }
                          });
                          this.autoLogoutService.autoLogout(
                            error.status,
                            this.router
                          );
                        }
                      );


                ///////////////-----------------------------------------------------------------


              }
              if (montant>commission.mntMin && montant>commission.mntMax) {
                console.log('ok1');
              }
              if (montant<commission.mntMin && montant<commission.mntMax) {
                console.log('ok2');
              }
            }
        }
        ////////////////-------------------------test--------------------------
      },error =>{
        this.loader = false;
        this.ErrorForm = this.fb.group({
          httpStatusCode: '401',
          methode: 'GetCommission',
          login: localStorage.getItem('login'),
          message: JSON.stringify(error.name),
          description:
            JSON.stringify(error.message) +
            '\n' +
            JSON.stringify(error.error),
        });
        this.factureService
          .Envoierror(this.ErrorForm.value)
          .subscribe((res) => {

          });

        Swal.fire({
          title: 'Echec!',
          text: 'Veuillez réessayer plutard!',
          html: '<center>Veuillez réessayer plutard!<br>Système indisponible actuellement</center>',
          icon: 'error',
          footer:
            '<a href="/Choix_facturier">Rechercher une autre facture?</a>',
        }).then((result) => {
          if (result.isConfirmed) {
            this.ngOnInit();
            this.router.navigate(['home']);
          }
        });
        this.autoLogoutService.autoLogout(error.status, this.router);
      });
    } else {
      this.erreurCode = true;
      this.ConfirmForm.reset();
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    localStorage.removeItem('NoOper');
  }

  ngListFactureFavoris(){
    this.factureFavorisService.listfacturefavoris(localStorage.getItem('login'),true).subscribe(res=>{
      console.log(res);
      this.listFactureFavoris=res;
    });
  }

  onChange(e: any) {
    console.log(e);
    this.refFavoris=e;
  }
  ngReferenceSaisir(){
    this.activeFavoris=false;
  }
  onShowFavoris(){
    this.showFavoris= true;
  }
  onRechercheFactue(){
    this.showFavoris= false;
  }
}
