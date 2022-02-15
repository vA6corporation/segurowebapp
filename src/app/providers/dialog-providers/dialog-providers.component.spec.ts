import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProvidersComponent } from './dialog-providers.component';

describe('DialogProvidersComponent', () => {
  let component: DialogProvidersComponent;
  let fixture: ComponentFixture<DialogProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
