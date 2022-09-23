import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessesComponent } from './create-businesses.component';

describe('CreateBusinessesComponent', () => {
  let component: CreateBusinessesComponent;
  let fixture: ComponentFixture<CreateBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
