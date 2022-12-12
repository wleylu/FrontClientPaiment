import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiereConnectComponent } from './premiere-connect.component';

describe('PremiereConnectComponent', () => {
  let component: PremiereConnectComponent;
  let fixture: ComponentFixture<PremiereConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiereConnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiereConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
