import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesEpsComponent } from './create-insurances-eps.component';

describe('CreateInsurancesEpsComponent', () => {
  let component: CreateInsurancesEpsComponent;
  let fixture: ComponentFixture<CreateInsurancesEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInsurancesEpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
