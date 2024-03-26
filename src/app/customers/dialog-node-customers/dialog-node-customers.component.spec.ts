import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNodeCustomersComponent } from './dialog-node-customers.component';

describe('DialogNodeCustomersComponent', () => {
  let component: DialogNodeCustomersComponent;
  let fixture: ComponentFixture<DialogNodeCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNodeCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNodeCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
