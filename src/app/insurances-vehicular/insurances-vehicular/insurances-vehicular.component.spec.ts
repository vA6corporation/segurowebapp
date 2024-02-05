import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesVehicularComponent } from './insurances-vehicular.component';

describe('InsurancesVehicularComponent', () => {
  let component: InsurancesVehicularComponent;
  let fixture: ComponentFixture<InsurancesVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesVehicularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
