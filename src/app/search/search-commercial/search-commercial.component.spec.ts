import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCommercialComponent } from './search-commercial.component';

describe('SearchCommercialComponent', () => {
  let component: SearchCommercialComponent;
  let fixture: ComponentFixture<SearchCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
