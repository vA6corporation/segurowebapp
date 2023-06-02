import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSeaceInboxComponent } from './dialog-edit-seace-inbox.component';

describe('DialogEditSeaceInboxComponent', () => {
  let component: DialogEditSeaceInboxComponent;
  let fixture: ComponentFixture<DialogEditSeaceInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditSeaceInboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditSeaceInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
