import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompliancesComponent } from './edit-compliances.component';

describe('EditCompliancesComponent', () => {
  let component: EditCompliancesComponent;
  let fixture: ComponentFixture<EditCompliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompliancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
