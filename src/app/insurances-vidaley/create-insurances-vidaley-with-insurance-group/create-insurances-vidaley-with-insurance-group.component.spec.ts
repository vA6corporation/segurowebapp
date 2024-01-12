import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesVidaleyWithInsuranceGroupComponent } from './create-insurances-vidaley-with-insurance-group.component';

describe('CreateInsurancesVidaleyWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesVidaleyWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesVidaleyWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesVidaleyWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesVidaleyWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
