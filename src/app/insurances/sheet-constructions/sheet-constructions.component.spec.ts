import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetConstructionsComponent } from './sheet-constructions.component';

describe('SheetConstructionsComponent', () => {
  let component: SheetConstructionsComponent;
  let fixture: ComponentFixture<SheetConstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetConstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetConstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
