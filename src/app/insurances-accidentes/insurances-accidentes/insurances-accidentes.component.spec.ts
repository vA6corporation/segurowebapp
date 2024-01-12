import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesAccidentesComponent } from './insurances-accidentes.component';

describe('InsurancesAccidentesComponent', () => {
  let component: InsurancesAccidentesComponent;
  let fixture: ComponentFixture<InsurancesAccidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesAccidentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesAccidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
