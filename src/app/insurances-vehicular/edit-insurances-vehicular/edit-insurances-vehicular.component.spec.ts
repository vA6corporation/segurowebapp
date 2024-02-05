import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesVehicularComponent } from './edit-insurances-vehicular.component';

describe('EditInsurancesVehicularComponent', () => {
  let component: EditInsurancesVehicularComponent;
  let fixture: ComponentFixture<EditInsurancesVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesVehicularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
