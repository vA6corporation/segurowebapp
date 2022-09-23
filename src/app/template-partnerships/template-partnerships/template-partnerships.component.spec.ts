import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePartnershipsComponent } from './template-partnerships.component';

describe('TemplatePartnershipsComponent', () => {
  let component: TemplatePartnershipsComponent;
  let fixture: ComponentFixture<TemplatePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
