import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePartnershipsComponent } from './insurance-partnerships.component';

describe('InsurancePartnershipsComponent', () => {
  let component: InsurancePartnershipsComponent;
  let fixture: ComponentFixture<InsurancePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
