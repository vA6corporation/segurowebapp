import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimingWorkersComponent } from './timing-workers.component';

describe('TimingWorkersComponent', () => {
  let component: TimingWorkersComponent;
  let fixture: ComponentFixture<TimingWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimingWorkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimingWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
