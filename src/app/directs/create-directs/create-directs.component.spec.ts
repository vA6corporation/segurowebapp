import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDirectsComponent } from './create-directs.component';

describe('CreateDirectsComponent', () => {
  let component: CreateDirectsComponent;
  let fixture: ComponentFixture<CreateDirectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDirectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDirectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
