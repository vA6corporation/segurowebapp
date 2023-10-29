import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOperationsComponent } from './edit-operations.component';

describe('EditOperationsComponent', () => {
  let component: EditOperationsComponent;
  let fixture: ComponentFixture<EditOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
