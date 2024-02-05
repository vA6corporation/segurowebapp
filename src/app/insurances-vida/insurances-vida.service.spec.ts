import { TestBed } from '@angular/core/testing';

import { InsurancesVidaService } from './insurances-vida.service';

describe('InsurancesVidaService', () => {
  let service: InsurancesVidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesVidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
