import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailChequesComponent } from './dialog-detail-cheques.component';

describe('DialogDetailChequesComponent', () => {
  let component: DialogDetailChequesComponent;
  let fixture: ComponentFixture<DialogDetailChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailChequesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
