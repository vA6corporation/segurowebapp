import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRenewObservationsComponent } from './dialog-renew-observations.component';

describe('DialogRenewObservationsComponent', () => {
  let component: DialogRenewObservationsComponent;
  let fixture: ComponentFixture<DialogRenewObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRenewObservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRenewObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
