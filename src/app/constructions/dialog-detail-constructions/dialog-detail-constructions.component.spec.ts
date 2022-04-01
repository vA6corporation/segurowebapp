import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailConstructionsComponent } from './dialog-detail-constructions.component';

describe('DialogDetailConstructionsComponent', () => {
  let component: DialogDetailConstructionsComponent;
  let fixture: ComponentFixture<DialogDetailConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
