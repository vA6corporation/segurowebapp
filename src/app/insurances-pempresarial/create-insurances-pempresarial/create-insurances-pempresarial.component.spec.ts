import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPempresarialComponent } from './create-insurances-pempresarial.component';

describe('CreateInsurancesPempresarialComponent', () => {
  let component: CreateInsurancesPempresarialComponent;
  let fixture: ComponentFixture<CreateInsurancesPempresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesPempresarialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPempresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
