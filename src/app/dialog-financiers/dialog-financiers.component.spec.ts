import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinanciersComponent } from './dialog-financiers.component';

describe('DialogFinanciersComponent', () => {
  let component: DialogFinanciersComponent;
  let fixture: ComponentFixture<DialogFinanciersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinanciersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinanciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
