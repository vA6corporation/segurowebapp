import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPempresarialWithInsuranceGroupComponent } from './create-insurances-pempresarial-with-insurance-group.component';

describe('CreateInsurancesPempresarialWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesPempresarialWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesPempresarialWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesPempresarialWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPempresarialWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
