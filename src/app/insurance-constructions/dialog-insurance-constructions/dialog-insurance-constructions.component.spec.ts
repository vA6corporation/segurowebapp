import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInsuranceConstructionsComponent } from './dialog-insurance-constructions.component';

describe('DialogInsuranceConstructionsComponent', () => {
  let component: DialogInsuranceConstructionsComponent;
  let fixture: ComponentFixture<DialogInsuranceConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInsuranceConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInsuranceConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
