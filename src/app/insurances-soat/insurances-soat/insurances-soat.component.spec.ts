import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesSoatComponent } from './insurances-soat.component';

describe('InsurancesSoatComponent', () => {
  let component: InsurancesSoatComponent;
  let fixture: ComponentFixture<InsurancesSoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesSoatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesSoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
