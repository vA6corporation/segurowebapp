import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTemplatePartnershipsComponent } from './dialog-template-partnerships.component';

describe('DialogTemplatePartnershipsComponent', () => {
  let component: DialogTemplatePartnershipsComponent;
  let fixture: ComponentFixture<DialogTemplatePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTemplatePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTemplatePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
