import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAttachPdfComponent } from './dialog-attach-pdf.component';

describe('DialogAttachPdfComponent', () => {
  let component: DialogAttachPdfComponent;
  let fixture: ComponentFixture<DialogAttachPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAttachPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAttachPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
