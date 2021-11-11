import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesPaymentComponent } from './cheques-payment.component';

describe('ChequesPaymentComponent', () => {
  let component: ChequesPaymentComponent;
  let fixture: ComponentFixture<ChequesPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequesPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
