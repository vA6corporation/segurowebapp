import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplatePartnershipsComponent } from './create-template-partnerships.component';

describe('CreateTemplatePartnershipsComponent', () => {
  let component: CreateTemplatePartnershipsComponent;
  let fixture: ComponentFixture<CreateTemplatePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTemplatePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemplatePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
