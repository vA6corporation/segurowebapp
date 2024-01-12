import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesSaludComponent } from './create-insurances-salud.component';

describe('CreateInsurancesSaludComponent', () => {
  let component: CreateInsurancesSaludComponent;
  let fixture: ComponentFixture<CreateInsurancesSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesSaludComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
