import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInsuranceBusinessesComponent } from './dialog-insurance-businesses.component';

describe('DialogInsuranceBusinessesComponent', () => {
  let component: DialogInsuranceBusinessesComponent;
  let fixture: ComponentFixture<DialogInsuranceBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInsuranceBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInsuranceBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
