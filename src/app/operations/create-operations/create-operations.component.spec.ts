import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperationsComponent } from './create-operations.component';

describe('CreateOperationsComponent', () => {
  let component: CreateOperationsComponent;
  let fixture: ComponentFixture<CreateOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
