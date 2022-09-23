import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectPdfComponent } from './dialog-select-pdf.component';

describe('DialogSelectPdfComponent', () => {
  let component: DialogSelectPdfComponent;
  let fixture: ComponentFixture<DialogSelectPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
