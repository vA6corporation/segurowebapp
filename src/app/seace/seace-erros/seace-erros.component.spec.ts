import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaceErrosComponent } from './seace-erros.component';

describe('SeaceErrosComponent', () => {
  let component: SeaceErrosComponent;
  let fixture: ComponentFixture<SeaceErrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaceErrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaceErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
