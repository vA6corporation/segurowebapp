import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuranceCustomersComponent } from './edit-insurance-customers.component';

describe('EditInsuranceCustomersComponent', () => {
  let component: EditInsuranceCustomersComponent;
  let fixture: ComponentFixture<EditInsuranceCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsuranceCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsuranceCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
