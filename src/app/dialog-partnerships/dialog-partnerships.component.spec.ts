import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPartnershipsComponent } from './dialog-partnerships.component';

describe('DialogPartnershipsComponent', () => {
  let component: DialogPartnershipsComponent;
  let fixture: ComponentFixture<DialogPartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
