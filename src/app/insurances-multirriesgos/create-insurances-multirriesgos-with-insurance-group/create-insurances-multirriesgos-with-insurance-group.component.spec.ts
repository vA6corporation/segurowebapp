import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesMultirriesgosWithInsuranceGroupComponent } from './create-insurances-multirriesgos-with-insurance-group.component';

describe('CreateInsurancesMultirriesgosWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesMultirriesgosWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesMultirriesgosWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesMultirriesgosWithInsuranceGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesMultirriesgosWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
