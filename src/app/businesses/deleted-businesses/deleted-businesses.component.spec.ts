import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedBusinessesComponent } from './deleted-businesses.component';

describe('DeletedBusinessesComponent', () => {
  let component: DeletedBusinessesComponent;
  let fixture: ComponentFixture<DeletedBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedBusinessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
