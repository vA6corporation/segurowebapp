import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesSctrComponent } from './edit-insurances-sctr.component';

describe('EditInsurancesSctrComponent', () => {
  let component: EditInsurancesSctrComponent;
  let fixture: ComponentFixture<EditInsurancesSctrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInsurancesSctrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesSctrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
