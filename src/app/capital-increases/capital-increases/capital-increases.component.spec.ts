import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalIncreasesComponent } from './capital-increases.component';

describe('CapitalIncreasesComponent', () => {
  let component: CapitalIncreasesComponent;
  let fixture: ComponentFixture<CapitalIncreasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalIncreasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitalIncreasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
