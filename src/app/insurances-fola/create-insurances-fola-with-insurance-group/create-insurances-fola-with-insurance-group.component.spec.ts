import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesFolaWithInsuranceGroupComponent } from './create-insurances-fola-with-insurance-group.component';

describe('CreateInsurancesFolaWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesFolaWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesFolaWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesFolaWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesFolaWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
