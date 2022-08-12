import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBailComponent } from './dialog-add-bail.component';

describe('DialogAddBailComponent', () => {
  let component: DialogAddBailComponent;
  let fixture: ComponentFixture<DialogAddBailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddBailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddBailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
