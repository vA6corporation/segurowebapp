import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesVehicularWithInsuranceGroupComponent } from './create-insurances-vehicular-with-insurance-group.component';

describe('CreateInsurancesVehicularWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesVehicularWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesVehicularWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesVehicularWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesVehicularWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
