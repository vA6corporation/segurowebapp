import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConstructionsComponent } from './edit-constructions.component';

describe('EditConstructionsComponent', () => {
  let component: EditConstructionsComponent;
  let fixture: ComponentFixture<EditConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
