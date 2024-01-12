import { TestBed } from '@angular/core/testing';

import { InsurancesEpsService } from './insurances-eps.service';

describe('InsurancesEpsService', () => {
  let service: InsurancesEpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesEpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
