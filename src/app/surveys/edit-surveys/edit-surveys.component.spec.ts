import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurveysComponent } from './edit-surveys.component';

describe('EditSurveysComponent', () => {
  let component: EditSurveysComponent;
  let fixture: ComponentFixture<EditSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSurveysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
