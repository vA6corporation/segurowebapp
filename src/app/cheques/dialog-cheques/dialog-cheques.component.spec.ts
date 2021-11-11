import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChequesComponent } from './dialog-cheques.component';

describe('DialogChequesComponent', () => {
  let component: DialogChequesComponent;
  let fixture: ComponentFixture<DialogChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChequesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
