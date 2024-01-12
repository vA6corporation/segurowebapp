import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPolizacarWithInsuranceGroupComponent } from './create-insurances-polizacar-with-insurance-group.component';

describe('CreateInsurancesPolizacarWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesPolizacarWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesPolizacarWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesPolizacarWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPolizacarWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
