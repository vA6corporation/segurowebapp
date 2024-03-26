import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateFeesComponent } from './dialog-create-fees.component';

describe('DialogCreateFeesComponent', () => {
  let component: DialogCreateFeesComponent;
  let fixture: ComponentFixture<DialogCreateFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCreateFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
