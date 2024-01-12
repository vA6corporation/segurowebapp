import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesPolizatrecComponent } from './insurances-polizatrec.component';

describe('InsurancesPolizatrecComponent', () => {
  let component: InsurancesPolizatrecComponent;
  let fixture: ComponentFixture<InsurancesPolizatrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesPolizatrecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesPolizatrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
