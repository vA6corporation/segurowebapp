import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFideicomisosComponent } from './edit-fideicomisos.component';

describe('EditFideicomisosComponent', () => {
  let component: EditFideicomisosComponent;
  let fixture: ComponentFixture<EditFideicomisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFideicomisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFideicomisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
