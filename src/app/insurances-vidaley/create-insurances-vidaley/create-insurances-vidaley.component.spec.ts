import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesVidaleyComponent } from './create-insurances-vidaley.component';

describe('CreateInsurancesVidaleyComponent', () => {
  let component: CreateInsurancesVidaleyComponent;
  let fixture: ComponentFixture<CreateInsurancesVidaleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesVidaleyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesVidaleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
