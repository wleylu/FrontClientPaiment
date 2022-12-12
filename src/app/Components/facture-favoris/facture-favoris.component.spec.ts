import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureFavorisComponent } from './facture-favoris.component';

describe('FactureFavorisComponent', () => {
  let component: FactureFavorisComponent;
  let fixture: ComponentFixture<FactureFavorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureFavorisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
