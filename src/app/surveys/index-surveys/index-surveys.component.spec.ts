import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSurveysComponent } from './index-surveys.component';

describe('IndexSurveysComponent', () => {
  let component: IndexSurveysComponent;
  let fixture: ComponentFixture<IndexSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSurveysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
