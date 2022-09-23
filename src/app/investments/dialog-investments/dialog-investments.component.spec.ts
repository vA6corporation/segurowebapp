import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInvestmentsComponent } from './dialog-investments.component';

describe('DialogInvestmentsComponent', () => {
  let component: DialogInvestmentsComponent;
  let fixture: ComponentFixture<DialogInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInvestmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
