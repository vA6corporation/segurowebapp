import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFideicomisosComponent } from './create-fideicomisos.component';

describe('CreateFideicomisosComponent', () => {
  let component: CreateFideicomisosComponent;
  let fixture: ComponentFixture<CreateFideicomisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFideicomisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFideicomisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
