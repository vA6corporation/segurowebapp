import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesRcivilComponent } from './insurances-rcivil.component';

describe('InsurancesRcivilComponent', () => {
  let component: InsurancesRcivilComponent;
  let fixture: ComponentFixture<InsurancesRcivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesRcivilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesRcivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
