import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPolizatrecComponent } from './create-insurances-polizatrec.component';

describe('CreateInsurancesPolizatrecComponent', () => {
  let component: CreateInsurancesPolizatrecComponent;
  let fixture: ComponentFixture<CreateInsurancesPolizatrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesPolizatrecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPolizatrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
