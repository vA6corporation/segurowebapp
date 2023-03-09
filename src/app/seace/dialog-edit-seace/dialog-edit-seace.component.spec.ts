import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSeaceComponent } from './dialog-edit-seace.component';

describe('DialogEditSeaceComponent', () => {
  let component: DialogEditSeaceComponent;
  let fixture: ComponentFixture<DialogEditSeaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditSeaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditSeaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
