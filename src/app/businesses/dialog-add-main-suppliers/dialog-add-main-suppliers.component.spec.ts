import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMainSuppliersComponent } from './dialog-add-main-suppliers.component';

describe('DialogAddMainSuppliersComponent', () => {
  let component: DialogAddMainSuppliersComponent;
  let fixture: ComponentFixture<DialogAddMainSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMainSuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMainSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
