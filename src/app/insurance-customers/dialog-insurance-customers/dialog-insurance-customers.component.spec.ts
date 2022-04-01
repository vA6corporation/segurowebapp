import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInsuranceCustomersComponent } from './dialog-insurance-customers.component';

describe('DialogInsuranceCustomersComponent', () => {
  let component: DialogInsuranceCustomersComponent;
  let fixture: ComponentFixture<DialogInsuranceCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInsuranceCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInsuranceCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
