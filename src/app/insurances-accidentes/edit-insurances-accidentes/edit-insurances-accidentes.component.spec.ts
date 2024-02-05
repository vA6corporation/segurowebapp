import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesAccidentesComponent } from './edit-insurances-accidentes.component';

describe('EditInsurancesAccidentesComponent', () => {
  let component: EditInsurancesAccidentesComponent;
  let fixture: ComponentFixture<EditInsurancesAccidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesAccidentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesAccidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
