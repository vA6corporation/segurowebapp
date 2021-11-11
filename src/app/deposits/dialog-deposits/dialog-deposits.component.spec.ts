import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDepositsComponent } from './dialog-deposits.component';

describe('DialogDepositsComponent', () => {
  let component: DialogDepositsComponent;
  let fixture: ComponentFixture<DialogDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDepositsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
