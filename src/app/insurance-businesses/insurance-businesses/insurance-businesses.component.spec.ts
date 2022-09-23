import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBusinessesComponent } from './insurance-businesses.component';

describe('InsuranceBusinessesComponent', () => {
  let component: InsuranceBusinessesComponent;
  let fixture: ComponentFixture<InsuranceBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
