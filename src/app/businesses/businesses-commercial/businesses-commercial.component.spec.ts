import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessesCommercialComponent } from './businesses-commercial.component';

describe('BusinessesCommercialComponent', () => {
  let component: BusinessesCommercialComponent;
  let fixture: ComponentFixture<BusinessesCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessesCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessesCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
