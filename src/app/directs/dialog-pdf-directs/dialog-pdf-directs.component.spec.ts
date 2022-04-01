import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPdfDirectsComponent } from './dialog-pdf-directs.component';

describe('DialogPdfDirectsComponent', () => {
  let component: DialogPdfDirectsComponent;
  let fixture: ComponentFixture<DialogPdfDirectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPdfDirectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPdfDirectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
