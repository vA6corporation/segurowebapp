import { TestBed } from '@angular/core/testing';

import { InsurancesMultirriesgosService } from './insurances-multirriesgos.service';

describe('InsurancesMultirriesgosService', () => {
  let service: InsurancesMultirriesgosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesMultirriesgosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
