import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIsosComponent } from './create-isos.component';

describe('CreateIsosComponent', () => {
  let component: CreateIsosComponent;
  let fixture: ComponentFixture<CreateIsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIsosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
