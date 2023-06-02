import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledUsersComponent } from './disabled-users.component';

describe('DisabledUsersComponent', () => {
  let component: DisabledUsersComponent;
  let fixture: ComponentFixture<DisabledUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
