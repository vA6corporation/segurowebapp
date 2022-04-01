import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinanciesComponent } from './dialog-financiers.component';

describe('DialogFinanciesComponent', () => {
  let component: DialogFinanciesComponent;
  let fixture: ComponentFixture<DialogFinanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinanciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
