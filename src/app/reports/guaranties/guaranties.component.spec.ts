import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantiesComponent } from './guaranties.component';

describe('GuarantiesComponent', () => {
  let component: GuarantiesComponent;
  let fixture: ComponentFixture<GuarantiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
