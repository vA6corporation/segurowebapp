import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesFolaComponent } from './create-insurances-fola.component';

describe('CreateInsurancesFolaComponent', () => {
  let component: CreateInsurancesFolaComponent;
  let fixture: ComponentFixture<CreateInsurancesFolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesFolaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInsurancesFolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
