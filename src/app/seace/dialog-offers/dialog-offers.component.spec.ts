import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOffersComponent } from './dialog-offers.component';

describe('DialogOffersComponent', () => {
  let component: DialogOffersComponent;
  let fixture: ComponentFixture<DialogOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
