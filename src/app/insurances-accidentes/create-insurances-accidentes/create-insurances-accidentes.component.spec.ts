import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesAccidentesComponent } from './create-insurances-accidentes.component';

describe('CreateInsurancesAccidentesComponent', () => {
  let component: CreateInsurancesAccidentesComponent;
  let fixture: ComponentFixture<CreateInsurancesAccidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesAccidentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesAccidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
