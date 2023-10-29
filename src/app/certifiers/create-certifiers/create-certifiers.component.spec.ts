import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCertifiersComponent } from './create-certifiers.component';

describe('CreateCertifiersComponent', () => {
  let component: CreateCertifiersComponent;
  let fixture: ComponentFixture<CreateCertifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCertifiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCertifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
