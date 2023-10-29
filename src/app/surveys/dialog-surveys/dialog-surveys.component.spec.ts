import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSurveysComponent } from './dialog-surveys.component';

describe('DialogSurveysComponent', () => {
  let component: DialogSurveysComponent;
  let fixture: ComponentFixture<DialogSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSurveysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
