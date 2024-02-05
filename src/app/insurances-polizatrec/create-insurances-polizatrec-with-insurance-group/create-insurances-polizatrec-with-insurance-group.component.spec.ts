import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPolizatrecWithInsuranceGroupComponent } from './create-insurances-polizatrec-with-insurance-group.component';

describe('CreateInsurancesPolizatrecWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesPolizatrecWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesPolizatrecWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesPolizatrecWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPolizatrecWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
