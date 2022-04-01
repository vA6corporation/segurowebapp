import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrokersComponent } from './edit-brokers.component';

describe('EditBrokersComponent', () => {
  let component: EditBrokersComponent;
  let fixture: ComponentFixture<EditBrokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBrokersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
