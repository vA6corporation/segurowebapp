import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompliancesComponent } from './create-compliances.component';

describe('CreateCompliancesComponent', () => {
  let component: CreateCompliancesComponent;
  let fixture: ComponentFixture<CreateCompliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompliancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
