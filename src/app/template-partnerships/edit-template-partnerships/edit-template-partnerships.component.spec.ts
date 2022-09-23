import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTemplatePartnershipsComponent } from './edit-template-partnerships.component';

describe('EditTemplatePartnershipsComponent', () => {
  let component: EditTemplatePartnershipsComponent;
  let fixture: ComponentFixture<EditTemplatePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTemplatePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTemplatePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
