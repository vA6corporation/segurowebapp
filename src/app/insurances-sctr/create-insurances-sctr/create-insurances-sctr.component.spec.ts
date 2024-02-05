import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesSctrComponent } from './create-insurances-sctr.component';

describe('CreateInsurancesSctrComponent', () => {
  let component: CreateInsurancesSctrComponent;
  let fixture: ComponentFixture<CreateInsurancesSctrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesSctrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesSctrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
