import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesPolizacarComponent } from './insurances-polizacar.component';

describe('InsurancesPolizacarComponent', () => {
  let component: InsurancesPolizacarComponent;
  let fixture: ComponentFixture<InsurancesPolizacarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesPolizacarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesPolizacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
