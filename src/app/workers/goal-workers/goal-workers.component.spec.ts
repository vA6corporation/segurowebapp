import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalWorkersComponent } from './goal-workers.component';

describe('GoalWorkersComponent', () => {
  let component: GoalWorkersComponent;
  let fixture: ComponentFixture<GoalWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalWorkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
