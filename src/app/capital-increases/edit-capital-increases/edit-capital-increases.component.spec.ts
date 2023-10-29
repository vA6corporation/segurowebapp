import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCapitalIncreasesComponent } from './edit-capital-increases.component';

describe('EditCapitalIncreasesComponent', () => {
  let component: EditCapitalIncreasesComponent;
  let fixture: ComponentFixture<EditCapitalIncreasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCapitalIncreasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCapitalIncreasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
