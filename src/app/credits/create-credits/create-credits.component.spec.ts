import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreditsComponent } from './create-credits.component';

describe('CreateCreditsComponent', () => {
  let component: CreateCreditsComponent;
  let fixture: ComponentFixture<CreateCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCreditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
