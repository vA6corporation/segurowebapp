import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutDocumentationComponent } from './without-documentation.component';

describe('WithoutDocumentationComponent', () => {
  let component: WithoutDocumentationComponent;
  let fixture: ComponentFixture<WithoutDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
