import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormsComponent } from './create-forms.component';

describe('CreateFormsComponent', () => {
  let component: CreateFormsComponent;
  let fixture: ComponentFixture<CreateFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
