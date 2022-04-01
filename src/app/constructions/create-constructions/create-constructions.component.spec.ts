import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConstructionsComponent } from './create-constructions.component';

describe('CreateConstructionsComponent', () => {
  let component: CreateConstructionsComponent;
  let fixture: ComponentFixture<CreateConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
