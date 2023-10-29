import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionWorkersComponent } from './commission-workers.component';

describe('CommissionWorkersComponent', () => {
  let component: CommissionWorkersComponent;
  let fixture: ComponentFixture<CommissionWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionWorkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
