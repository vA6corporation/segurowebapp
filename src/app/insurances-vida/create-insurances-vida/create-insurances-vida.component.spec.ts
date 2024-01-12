import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesVidaComponent } from './create-insurances-vida.component';

describe('CreateInsurancesVidaComponent', () => {
  let component: CreateInsurancesVidaComponent;
  let fixture: ComponentFixture<CreateInsurancesVidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesVidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
