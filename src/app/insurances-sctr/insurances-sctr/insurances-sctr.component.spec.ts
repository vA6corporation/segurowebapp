import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesSctrComponent } from './insurances-sctr.component';

describe('InsurancesSctrComponent', () => {
  let component: InsurancesSctrComponent;
  let fixture: ComponentFixture<InsurancesSctrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesSctrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesSctrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
