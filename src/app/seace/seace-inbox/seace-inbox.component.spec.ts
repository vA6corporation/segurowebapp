import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaceInboxComponent } from './seace-inbox.component';

describe('SeaceInboxComponent', () => {
  let component: SeaceInboxComponent;
  let fixture: ComponentFixture<SeaceInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaceInboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaceInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
