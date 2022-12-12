import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiPaiementSodeciComponent } from './envoi-paiement-sodeci.component';

describe('EnvoiPaiementSodeciComponent', () => {
  let component: EnvoiPaiementSodeciComponent;
  let fixture: ComponentFixture<EnvoiPaiementSodeciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoiPaiementSodeciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiPaiementSodeciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
