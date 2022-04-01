import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModelsComponent } from './customers.component';

describe('CustomerModelsComponent', () => {
  let component: CustomerModelsComponent;
  let fixture: ComponentFixture<CustomerModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
