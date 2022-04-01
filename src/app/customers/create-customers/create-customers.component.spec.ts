import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerModelsComponent } from './create-customers.component';

describe('CreateCustomerModelComponent', () => {
  let component: CreateCustomerModelsComponent;
  let fixture: ComponentFixture<CreateCustomerModelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
