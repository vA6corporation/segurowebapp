import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesRcivilComponent } from './create-insurances-rcivil.component';

describe('CreateInsurancesRcivilComponent', () => {
  let component: CreateInsurancesRcivilComponent;
  let fixture: ComponentFixture<CreateInsurancesRcivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesRcivilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesRcivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
