import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPercentCompletionsComponent } from './dialog-percent-completions.component';

describe('DialogPercentCompletionsComponent', () => {
  let component: DialogPercentCompletionsComponent;
  let fixture: ComponentFixture<DialogPercentCompletionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPercentCompletionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPercentCompletionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
