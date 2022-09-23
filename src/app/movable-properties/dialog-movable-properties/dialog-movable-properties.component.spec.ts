import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMovablePropertiesComponent } from './dialog-movable-properties.component';

describe('DialogMovablePropertiesComponent', () => {
  let component: DialogMovablePropertiesComponent;
  let fixture: ComponentFixture<DialogMovablePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMovablePropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMovablePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
