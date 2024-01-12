import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesVidaWithInsuranceGroupComponent } from './create-insurances-vida-with-insurance-group.component';

describe('CreateInsurancesVidaWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesVidaWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesVidaWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesVidaWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesVidaWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
