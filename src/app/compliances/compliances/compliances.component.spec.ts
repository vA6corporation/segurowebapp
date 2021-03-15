import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancesComponent } from './compliances.component';

describe('CompliancesComponent', () => {
  let component: CompliancesComponent;
  let fixture: ComponentFixture<CompliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompliancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
