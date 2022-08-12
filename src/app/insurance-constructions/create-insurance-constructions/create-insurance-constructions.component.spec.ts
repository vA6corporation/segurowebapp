import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsuranceConstructionsComponent } from './create-insurance-constructions.component';

describe('CreateInsuranceConstructionsComponent', () => {
  let component: CreateInsuranceConstructionsComponent;
  let fixture: ComponentFixture<CreateInsuranceConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInsuranceConstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInsuranceConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
