import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesWithInsuranceGroupComponent } from './create-insurances-with-insurance-group.component';

describe('CreateInsurancesWithInsuranceGroupComponent', () => {
  let component: CreateInsurancesWithInsuranceGroupComponent;
  let fixture: ComponentFixture<CreateInsurancesWithInsuranceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInsurancesWithInsuranceGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInsurancesWithInsuranceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
