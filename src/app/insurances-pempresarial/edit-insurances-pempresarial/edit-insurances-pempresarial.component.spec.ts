import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesPempresarialComponent } from './edit-insurances-pempresarial.component';

describe('EditInsurancesPempresarialComponent', () => {
  let component: EditInsurancesPempresarialComponent;
  let fixture: ComponentFixture<EditInsurancesPempresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesPempresarialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesPempresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
