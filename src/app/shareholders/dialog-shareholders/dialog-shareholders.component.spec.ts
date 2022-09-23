import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShareholdersComponent } from './dialog-shareholders.component';

describe('DialogShareholdersComponent', () => {
  let component: DialogShareholdersComponent;
  let fixture: ComponentFixture<DialogShareholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShareholdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShareholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
