import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertifiersComponent } from './edit-certifiers.component';

describe('EditCertifiersComponent', () => {
  let component: EditCertifiersComponent;
  let fixture: ComponentFixture<EditCertifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCertifiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCertifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
