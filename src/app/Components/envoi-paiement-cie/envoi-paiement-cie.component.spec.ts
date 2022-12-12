import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiPaiementCieComponent } from './envoi-paiement-cie.component';

describe('EnvoiPaiementCieComponent', () => {
  let component: EnvoiPaiementCieComponent;
  let fixture: ComponentFixture<EnvoiPaiementCieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoiPaiementCieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiPaiementCieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
