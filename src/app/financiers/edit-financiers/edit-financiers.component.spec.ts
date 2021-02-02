import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinanciersComponent } from './edit-financiers.component';

describe('EditFinanciersComponent', () => {
  let component: EditFinanciersComponent;
  let fixture: ComponentFixture<EditFinanciersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFinanciersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinanciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
