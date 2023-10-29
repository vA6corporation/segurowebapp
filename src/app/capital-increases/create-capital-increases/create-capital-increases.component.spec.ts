import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCapitalIncreasesComponent } from './create-capital-increases.component';

describe('CreateCapitalIncreasesComponent', () => {
  let component: CreateCapitalIncreasesComponent;
  let fixture: ComponentFixture<CreateCapitalIncreasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCapitalIncreasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCapitalIncreasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
