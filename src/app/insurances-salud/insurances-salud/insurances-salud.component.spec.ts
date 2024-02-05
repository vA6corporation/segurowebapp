import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesSaludComponent } from './insurances-salud.component';

describe('InsurancesSaludComponent', () => {
  let component: InsurancesSaludComponent;
  let fixture: ComponentFixture<InsurancesSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesSaludComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
