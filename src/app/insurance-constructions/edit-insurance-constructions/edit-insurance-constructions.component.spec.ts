import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuranceConstructionsComponent } from './edit-insurance-constructions.component';

describe('EditInsuranceConstructionsComponent', () => {
  let component: EditInsuranceConstructionsComponent;
  let fixture: ComponentFixture<EditInsuranceConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsuranceConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsuranceConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
