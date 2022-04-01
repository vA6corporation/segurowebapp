import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancePartnershipsComponent } from './edit-insurance-partnerships.component';

describe('EditInsurancePartnershipsComponent', () => {
  let component: EditInsurancePartnershipsComponent;
  let fixture: ComponentFixture<EditInsurancePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsurancePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsurancePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
