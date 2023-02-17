import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIsosComponent } from './edit-isos.component';

describe('EditIsosComponent', () => {
  let component: EditIsosComponent;
  let fixture: ComponentFixture<EditIsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIsosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
