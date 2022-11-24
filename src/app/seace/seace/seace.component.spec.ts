import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaceComponent } from './seace.component';

describe('SeaceComponent', () => {
  let component: SeaceComponent;
  let fixture: ComponentFixture<SeaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
