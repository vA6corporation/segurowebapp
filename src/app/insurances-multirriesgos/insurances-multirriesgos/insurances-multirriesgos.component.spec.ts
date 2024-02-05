import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesMultirriesgosComponent } from './insurances-multirriesgos.component';

describe('InsurancesMultirriesgosComponent', () => {
  let component: InsurancesMultirriesgosComponent;
  let fixture: ComponentFixture<InsurancesMultirriesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesMultirriesgosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesMultirriesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
