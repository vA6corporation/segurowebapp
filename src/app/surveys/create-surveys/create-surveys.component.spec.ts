import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveysComponent } from './create-surveys.component';

describe('CreateSurveysComponent', () => {
  let component: CreateSurveysComponent;
  let fixture: ComponentFixture<CreateSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSurveysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
