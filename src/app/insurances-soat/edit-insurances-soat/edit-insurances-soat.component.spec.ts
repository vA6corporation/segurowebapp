import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesSoatComponent } from './edit-insurances-soat.component';

describe('EditInsurancesSoatComponent', () => {
  let component: EditInsurancesSoatComponent;
  let fixture: ComponentFixture<EditInsurancesSoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesSoatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesSoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
