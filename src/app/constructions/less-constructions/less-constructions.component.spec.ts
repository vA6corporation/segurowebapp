import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessConstructionsComponent } from './less-constructions.component';

describe('LessConstructionsComponent', () => {
  let component: LessConstructionsComponent;
  let fixture: ComponentFixture<LessConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
