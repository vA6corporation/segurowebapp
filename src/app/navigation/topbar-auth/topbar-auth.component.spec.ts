import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarAuthComponent } from './topbar-auth.component';

describe('TopbarAuthComponent', () => {
  let component: TopbarAuthComponent;
  let fixture: ComponentFixture<TopbarAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbarAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
