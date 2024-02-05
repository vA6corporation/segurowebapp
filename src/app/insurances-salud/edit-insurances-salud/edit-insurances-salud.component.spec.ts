import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesSaludComponent } from './edit-insurances-salud.component';

describe('EditInsurancesSaludComponent', () => {
  let component: EditInsurancesSaludComponent;
  let fixture: ComponentFixture<EditInsurancesSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesSaludComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
