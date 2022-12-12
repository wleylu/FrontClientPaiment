import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeConnexionComponent } from './page-de-connexion.component';

describe('PageDeConnexionComponent', () => {
  let component: PageDeConnexionComponent;
  let fixture: ComponentFixture<PageDeConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDeConnexionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDeConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
