import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesFolaComponent } from './insurances-fola.component';

describe('InsurancesFolaComponent', () => {
  let component: InsurancesFolaComponent;
  let fixture: ComponentFixture<InsurancesFolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesFolaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesFolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
