import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCustomersComponent } from './insurance-customers.component';

describe('InsuranceCustomersComponent', () => {
  let component: InsuranceCustomersComponent;
  let fixture: ComponentFixture<InsuranceCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
