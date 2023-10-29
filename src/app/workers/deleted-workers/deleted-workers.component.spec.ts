import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedWorkersComponent } from './deleted-workers.component';

describe('DeletedWorkersComponent', () => {
  let component: DeletedWorkersComponent;
  let fixture: ComponentFixture<DeletedWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedWorkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
