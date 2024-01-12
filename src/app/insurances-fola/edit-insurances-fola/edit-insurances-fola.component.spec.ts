import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesFolaComponent } from './edit-insurances-fola.component';

describe('EditInsurancesFolaComponent', () => {
  let component: EditInsurancesFolaComponent;
  let fixture: ComponentFixture<EditInsurancesFolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInsurancesFolaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInsurancesFolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
