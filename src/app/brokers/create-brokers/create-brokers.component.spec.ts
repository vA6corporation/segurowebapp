import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrokersComponent } from './create-brokers.component';

describe('CreateBrokersComponent', () => {
  let component: CreateBrokersComponent;
  let fixture: ComponentFixture<CreateBrokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBrokersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
