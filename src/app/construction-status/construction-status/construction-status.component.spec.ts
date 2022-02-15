import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionStatusComponent } from './construction-status.component';

describe('ConstructionStatusComponent', () => {
  let component: ConstructionStatusComponent;
  let fixture: ComponentFixture<ConstructionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
