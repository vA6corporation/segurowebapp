import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesMultirriesgosComponent } from './edit-insurances-multirriesgos.component';

describe('EditInsurancesMultirriesgosComponent', () => {
  let component: EditInsurancesMultirriesgosComponent;
  let fixture: ComponentFixture<EditInsurancesMultirriesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesMultirriesgosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesMultirriesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
