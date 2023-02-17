import { TestBed } from '@angular/core/testing';

import { FideicomisosService } from './fideicomisos.service';

describe('FideicomisosService', () => {
  let service: FideicomisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FideicomisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
