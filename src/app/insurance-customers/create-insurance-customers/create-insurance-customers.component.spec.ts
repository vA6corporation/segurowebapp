import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsuranceCustomersComponent } from './create-insurance-customers.component';

describe('CreateInsuranceCustomersComponent', () => {
  let component: CreateInsuranceCustomersComponent;
  let fixture: ComponentFixture<CreateInsuranceCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInsuranceCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInsuranceCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
