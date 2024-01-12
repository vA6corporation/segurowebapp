import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesSoatComponent } from './create-insurances-soat.component';

describe('CreateInsurancesSoatComponent', () => {
  let component: CreateInsurancesSoatComponent;
  let fixture: ComponentFixture<CreateInsurancesSoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesSoatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesSoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
