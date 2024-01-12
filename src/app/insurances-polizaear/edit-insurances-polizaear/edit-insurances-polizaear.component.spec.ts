import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesPolizaearComponent } from './edit-insurances-polizaear.component';

describe('EditInsurancesPolizaearComponent', () => {
  let component: EditInsurancesPolizaearComponent;
  let fixture: ComponentFixture<EditInsurancesPolizaearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesPolizaearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesPolizaearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
