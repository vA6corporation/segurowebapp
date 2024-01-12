import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesVidaleyComponent } from './edit-insurances-vidaley.component';

describe('EditInsurancesVidaleyComponent', () => {
  let component: EditInsurancesVidaleyComponent;
  let fixture: ComponentFixture<EditInsurancesVidaleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesVidaleyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesVidaleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
