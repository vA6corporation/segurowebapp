import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesVidaleyComponent } from './insurances-vidaley.component';

describe('InsurancesVidaleyComponent', () => {
  let component: InsurancesVidaleyComponent;
  let fixture: ComponentFixture<InsurancesVidaleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesVidaleyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesVidaleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
