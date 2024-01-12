import { TestBed } from '@angular/core/testing';

import { InsurancesSctrService } from './insurances-sctr.service';

describe('InsurancesSctrService', () => {
  let service: InsurancesSctrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesSctrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
