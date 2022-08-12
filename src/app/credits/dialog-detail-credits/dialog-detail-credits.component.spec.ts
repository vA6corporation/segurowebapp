import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailCreditsComponent } from './dialog-detail-credits.component';

describe('DialogDetailCreditsComponent', () => {
  let component: DialogDetailCreditsComponent;
  let fixture: ComponentFixture<DialogDetailCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailCreditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
