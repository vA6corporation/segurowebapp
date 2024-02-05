import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesPolizaearComponent } from './insurances-polizaear.component';

describe('InsurancesPolizaearComponent', () => {
  let component: InsurancesPolizaearComponent;
  let fixture: ComponentFixture<InsurancesPolizaearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesPolizaearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesPolizaearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
