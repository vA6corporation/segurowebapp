import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipsCommercialComponent } from './partnerships-commercial.component';

describe('PartnershipsCommercialComponent', () => {
  let component: PartnershipsCommercialComponent;
  let fixture: ComponentFixture<PartnershipsCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnershipsCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipsCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
