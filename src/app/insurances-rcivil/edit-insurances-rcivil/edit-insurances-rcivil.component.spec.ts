import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesRcivilComponent } from './edit-insurances-rcivil.component';

describe('EditInsurancesRcivilComponent', () => {
  let component: EditInsurancesRcivilComponent;
  let fixture: ComponentFixture<EditInsurancesRcivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesRcivilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesRcivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
