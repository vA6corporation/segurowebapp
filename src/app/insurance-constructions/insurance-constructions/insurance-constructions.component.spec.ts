import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceConstructionsComponent } from './insurance-constructions.component';

describe('InsuranceConstructionsComponent', () => {
  let component: InsuranceConstructionsComponent;
  let fixture: ComponentFixture<InsuranceConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
