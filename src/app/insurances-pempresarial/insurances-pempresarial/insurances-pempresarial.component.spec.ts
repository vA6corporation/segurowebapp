import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesPempresarialComponent } from './insurances-pempresarial.component';

describe('InsurancesPempresarialComponent', () => {
  let component: InsurancesPempresarialComponent;
  let fixture: ComponentFixture<InsurancesPempresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesPempresarialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesPempresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
