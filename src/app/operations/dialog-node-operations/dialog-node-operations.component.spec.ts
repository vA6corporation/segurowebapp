import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNodeOperationsComponent } from './dialog-node-operations.component';

describe('DialogNodeOperationsComponent', () => {
  let component: DialogNodeOperationsComponent;
  let fixture: ComponentFixture<DialogNodeOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNodeOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNodeOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
