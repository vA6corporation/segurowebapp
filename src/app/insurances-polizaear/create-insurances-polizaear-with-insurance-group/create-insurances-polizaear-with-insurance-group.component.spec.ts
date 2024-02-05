import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPolizaearWithInsuranceGroupComponent } from './create-insurances-polizaear-with-insurance-group.component';

describe('CreateInsurancesPolizaearWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesPolizaearWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesPolizaearWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesPolizaearWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPolizaearWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
