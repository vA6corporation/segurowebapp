import { TestBed } from '@angular/core/testing';

import { IsosService } from './isos.service';

describe('IsosService', () => {
  let service: IsosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
