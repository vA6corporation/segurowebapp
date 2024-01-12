import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesMultirriesgosComponent } from './create-insurances-multirriesgos.component';

describe('CreateInsurancesMultirriesgosComponent', () => {
  let component: CreateInsurancesMultirriesgosComponent;
  let fixture: ComponentFixture<CreateInsurancesMultirriesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesMultirriesgosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesMultirriesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
