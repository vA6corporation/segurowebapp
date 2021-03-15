import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDirectsComponent } from './edit-directs.component';

describe('EditDirectsComponent', () => {
  let component: EditDirectsComponent;
  let fixture: ComponentFixture<EditDirectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDirectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDirectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
