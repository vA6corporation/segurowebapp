import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPdfCompliancesComponent } from './dialog-pdf-compliances.component';

describe('DialogPdfCompliancesComponent', () => {
  let component: DialogPdfCompliancesComponent;
  let fixture: ComponentFixture<DialogPdfCompliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPdfCompliancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPdfCompliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
