import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsuranceBusinessesComponent } from './create-insurance-businesses.component';

describe('CreateInsuranceBusinessesComponent', () => {
  let component: CreateInsuranceBusinessesComponent;
  let fixture: ComponentFixture<CreateInsuranceBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInsuranceBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInsuranceBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
