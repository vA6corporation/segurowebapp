import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionCustomersComponent } from './construction-customers.component';

describe('ConstructionCustomersComponent', () => {
  let component: ConstructionCustomersComponent;
  let fixture: ComponentFixture<ConstructionCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
