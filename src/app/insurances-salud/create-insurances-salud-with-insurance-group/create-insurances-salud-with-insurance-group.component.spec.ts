import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesSaludWithInsuranceGroupComponent } from './create-insurances-salud-with-insurance-group.component';

describe('CreateInsurancesSaludWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesSaludWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesSaludWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesSaludWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesSaludWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
