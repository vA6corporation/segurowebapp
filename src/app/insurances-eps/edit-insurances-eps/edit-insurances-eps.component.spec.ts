import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesEpsComponent } from './edit-insurances-eps.component';

describe('EditInsurancesEpsComponent', () => {
  let component: EditInsurancesEpsComponent;
  let fixture: ComponentFixture<EditInsurancesEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesEpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
