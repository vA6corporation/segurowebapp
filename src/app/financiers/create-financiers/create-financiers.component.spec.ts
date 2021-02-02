import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinanciersComponent } from './create-financiers.component';

describe('CreateFinanciersComponent', () => {
  let component: CreateFinanciersComponent;
  let fixture: ComponentFixture<CreateFinanciersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFinanciersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFinanciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
