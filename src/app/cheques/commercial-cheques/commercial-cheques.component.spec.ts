import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialChequesComponent } from './commercial-cheques.component';

describe('CommercialChequesComponent', () => {
  let component: CommercialChequesComponent;
  let fixture: ComponentFixture<CommercialChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialChequesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
