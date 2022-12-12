import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetScreenComponent } from './reset-screen.component';

describe('ResetScreenComponent', () => {
  let component: ResetScreenComponent;
  let fixture: ComponentFixture<ResetScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
