import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesAccidentesWithInsuranceGroupComponent } from './create-insurances-accidentes-with-insurance-group.component';

describe('CreateInsurancesAccidentesWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesAccidentesWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesAccidentesWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesAccidentesWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesAccidentesWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
