import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionsCommercialComponent } from './constructions-commercial.component';

describe('ConstructionsCommercialComponent', () => {
  let component: ConstructionsCommercialComponent;
  let fixture: ComponentFixture<ConstructionsCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionsCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionsCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
