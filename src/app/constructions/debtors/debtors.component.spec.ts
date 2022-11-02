import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsComponent } from './debtors.component';

describe('DebtorsComponent', () => {
  let component: DebtorsComponent;
  let fixture: ComponentFixture<DebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
