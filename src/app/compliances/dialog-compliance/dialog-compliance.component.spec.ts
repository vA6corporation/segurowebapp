import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComplianceComponent } from './dialog-compliance.component';

describe('DialogComplianceComponent', () => {
  let component: DialogComplianceComponent;
  let fixture: ComponentFixture<DialogComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
