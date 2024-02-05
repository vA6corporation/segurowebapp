import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesSctrWithInsuranceGroupComponent } from './create-insurances-sctr-with-insurance-group.component';

describe('CreateInsurancesSctrWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesSctrWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesSctrWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesSctrWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesSctrWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
