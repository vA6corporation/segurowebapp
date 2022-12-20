import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePercentCompletionsComponent } from './update-percent-completions.component';

describe('UpdatePercentCompletionsComponent', () => {
  let component: UpdatePercentCompletionsComponent;
  let fixture: ComponentFixture<UpdatePercentCompletionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePercentCompletionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePercentCompletionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
