import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesEpsWithInsuranceGroupComponent } from './create-insurances-eps-with-insurance-group.component';

describe('CreateInsurancesEpsWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesEpsWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesEpsWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesEpsWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesEpsWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
