import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesVehicularComponent } from './create-insurances-vehicular.component';

describe('CreateInsurancesVehicularComponent', () => {
  let component: CreateInsurancesVehicularComponent;
  let fixture: ComponentFixture<CreateInsurancesVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesVehicularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
