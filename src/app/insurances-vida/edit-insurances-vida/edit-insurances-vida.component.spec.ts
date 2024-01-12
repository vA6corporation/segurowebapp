import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesVidaComponent } from './edit-insurances-vida.component';

describe('EditInsurancesVidaComponent', () => {
  let component: EditInsurancesVidaComponent;
  let fixture: ComponentFixture<EditInsurancesVidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesVidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
