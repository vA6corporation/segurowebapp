import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesVidaComponent } from './insurances-vida.component';

describe('InsurancesVidaComponent', () => {
  let component: InsurancesVidaComponent;
  let fixture: ComponentFixture<InsurancesVidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesVidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
