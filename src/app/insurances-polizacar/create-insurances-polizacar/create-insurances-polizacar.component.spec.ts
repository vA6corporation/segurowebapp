import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesPolizacarComponent } from './create-insurances-polizacar.component';

describe('CreateInsurancesPolizacarComponent', () => {
  let component: CreateInsurancesPolizacarComponent;
  let fixture: ComponentFixture<CreateInsurancesPolizacarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesPolizacarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesPolizacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
