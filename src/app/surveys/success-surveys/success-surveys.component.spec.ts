import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSurveysComponent } from './success-surveys.component';

describe('SuccessSurveysComponent', () => {
  let component: SuccessSurveysComponent;
  let fixture: ComponentFixture<SuccessSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessSurveysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
