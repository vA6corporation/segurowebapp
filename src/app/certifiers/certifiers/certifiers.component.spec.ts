import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiersComponent } from './certifiers.component';

describe('CertifiersComponent', () => {
  let component: CertifiersComponent;
  let fixture: ComponentFixture<CertifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
