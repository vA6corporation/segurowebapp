import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesEpsComponent } from './insurances-eps.component';

describe('InsurancesEpsComponent', () => {
  let component: InsurancesEpsComponent;
  let fixture: ComponentFixture<InsurancesEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsurancesEpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
