import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDirectComponent } from './dialog-direct.component';

describe('DialogDirectComponent', () => {
  let component: DialogDirectComponent;
  let fixture: ComponentFixture<DialogDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
