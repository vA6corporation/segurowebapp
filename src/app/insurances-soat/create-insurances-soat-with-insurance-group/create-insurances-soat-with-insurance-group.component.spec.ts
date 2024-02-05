import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesSoatWithInsuranceGroupComponent } from './create-insurances-soat-with-insurance-group.component';

describe('CreateInsurancesSoatWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesSoatWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesSoatWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesSoatWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesSoatWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
