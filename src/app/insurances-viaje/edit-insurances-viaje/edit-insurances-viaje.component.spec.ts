import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesViajeComponent } from './edit-insurances-viaje.component';

describe('EditInsurancesViajeComponent', () => {
  let component: EditInsurancesViajeComponent;
  let fixture: ComponentFixture<EditInsurancesViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesViajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
