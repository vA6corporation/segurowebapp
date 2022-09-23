import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExperiencesComponent } from './dialog-experiences.component';

describe('DialogExperiencesComponent', () => {
  let component: DialogExperiencesComponent;
  let fixture: ComponentFixture<DialogExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExperiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
