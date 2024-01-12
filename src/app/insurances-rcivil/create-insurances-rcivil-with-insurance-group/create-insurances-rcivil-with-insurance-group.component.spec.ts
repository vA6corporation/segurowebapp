import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesRcivilWithInsuranceGroupComponent } from './create-insurances-rcivil-with-insurance-group.component';

describe('CreateInsurancesRcivilWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesRcivilWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesRcivilWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesRcivilWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesRcivilWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
