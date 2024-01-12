import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesPolizatrecComponent } from './edit-insurances-polizatrec.component';

describe('EditInsurancesPolizatrecComponent', () => {
  let component: EditInsurancesPolizatrecComponent;
  let fixture: ComponentFixture<EditInsurancesPolizatrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesPolizatrecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesPolizatrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
