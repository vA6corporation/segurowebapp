import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentCompletionsComponent } from './percent-completions.component';

describe('PercentCompletionsComponent', () => {
  let component: PercentCompletionsComponent;
  let fixture: ComponentFixture<PercentCompletionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentCompletionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentCompletionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
