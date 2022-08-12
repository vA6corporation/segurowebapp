import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConstructionCustomersComponent } from './dialog-construction-customers.component';

describe('DialogConstructionCustomersComponent', () => {
  let component: DialogConstructionCustomersComponent;
  let fixture: ComponentFixture<DialogConstructionCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConstructionCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConstructionCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
