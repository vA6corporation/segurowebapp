import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesViajeWithInsuranceGroupComponent } from './create-insurances-viaje-with-insurance-group.component';

describe('CreateInsurancesViajeWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesViajeWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesViajeWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesViajeWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesViajeWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
