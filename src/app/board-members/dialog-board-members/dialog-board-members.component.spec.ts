import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoardMembersComponent } from './dialog-board-members.component';

describe('DialogBoardMembersComponent', () => {
  let component: DialogBoardMembersComponent;
  let fixture: ComponentFixture<DialogBoardMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoardMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoardMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
