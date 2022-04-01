import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancePartnershipsComponent } from './create-insurance-partnerships.component';

describe('CreateInsurancePartnershipsComponent', () => {
  let component: CreateInsurancePartnershipsComponent;
  let fixture: ComponentFixture<CreateInsurancePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInsurancePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInsurancePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
