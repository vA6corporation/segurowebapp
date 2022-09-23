import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuranceBusinessesComponent } from './edit-insurance-businesses.component';

describe('EditInsuranceBusinessesComponent', () => {
  let component: EditInsuranceBusinessesComponent;
  let fixture: ComponentFixture<EditInsuranceBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsuranceBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsuranceBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
