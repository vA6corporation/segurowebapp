import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPolizaearComponent } from './create-insurances-polizaear.component';

describe('CreateInsurancesPolizaearComponent', () => {
  let component: CreateInsurancesPolizaearComponent;
  let fixture: ComponentFixture<CreateInsurancesPolizaearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesPolizaearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPolizaearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
