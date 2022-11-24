import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeaceDetailsComponent } from './dialog-seace-details.component';

describe('DialogSeaceDetailsComponent', () => {
  let component: DialogSeaceDetailsComponent;
  let fixture: ComponentFixture<DialogSeaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSeaceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSeaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
