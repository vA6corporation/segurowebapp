import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPieComponent } from './report-pie.component';

describe('ReportPieComponent', () => {
  let component: ReportPieComponent;
  let fixture: ComponentFixture<ReportPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
