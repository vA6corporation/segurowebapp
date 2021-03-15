import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBeneficiariesComponent } from './dialog-beneficiaries.component';

describe('DialogBeneficiariesComponent', () => {
  let component: DialogBeneficiariesComponent;
  let fixture: ComponentFixture<DialogBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBeneficiariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
