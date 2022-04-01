import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditsComponent } from './edit-credits.component';

describe('EditCreditsComponent', () => {
  let component: EditCreditsComponent;
  let fixture: ComponentFixture<EditCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
