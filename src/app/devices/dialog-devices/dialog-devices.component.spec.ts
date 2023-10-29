import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDevicesComponent } from './dialog-devices.component';

describe('DialogDevicesComponent', () => {
  let component: DialogDevicesComponent;
  let fixture: ComponentFixture<DialogDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
