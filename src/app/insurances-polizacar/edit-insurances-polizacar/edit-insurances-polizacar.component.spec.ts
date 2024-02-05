import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesPolizacarComponent } from './edit-insurances-polizacar.component';

describe('EditInsurancesPolizacarComponent', () => {
  let component: EditInsurancesPolizacarComponent;
  let fixture: ComponentFixture<EditInsurancesPolizacarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesPolizacarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesPolizacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
