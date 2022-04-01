import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInsurancePartnershipsComponent } from './dialog-insurance-partnerships.component';

describe('DialogInsurancePartnershipsComponent', () => {
  let component: DialogInsurancePartnershipsComponent;
  let fixture: ComponentFixture<DialogInsurancePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInsurancePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInsurancePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
