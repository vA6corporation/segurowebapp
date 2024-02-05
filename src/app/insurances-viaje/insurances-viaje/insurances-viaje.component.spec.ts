import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesViajeComponent } from './insurances-viaje.component';

describe('InsurancesViajeComponent', () => {
  let component: InsurancesViajeComponent;
  let fixture: ComponentFixture<InsurancesViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesViajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
