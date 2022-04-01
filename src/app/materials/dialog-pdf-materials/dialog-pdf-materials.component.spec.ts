import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPdfMaterialsComponent } from './dialog-pdf-materials.component';

describe('DialogPdfMaterialsComponent', () => {
  let component: DialogPdfMaterialsComponent;
  let fixture: ComponentFixture<DialogPdfMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPdfMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPdfMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
