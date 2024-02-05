import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesViajeComponent } from './create-insurances-viaje.component';

describe('CreateInsurancesViajeComponent', () => {
  let component: CreateInsurancesViajeComponent;
  let fixture: ComponentFixture<CreateInsurancesViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesViajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
