import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConstructionsComponent } from './dialog-constructions.component';

describe('DialogConstructionsComponent', () => {
  let component: DialogConstructionsComponent;
  let fixture: ComponentFixture<DialogConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
