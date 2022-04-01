import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBrokersComponent } from './dialog-brokers.component';

describe('DialogBrokersComponent', () => {
  let component: DialogBrokersComponent;
  let fixture: ComponentFixture<DialogBrokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBrokersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
