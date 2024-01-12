import { TestBed } from '@angular/core/testing';

import { InsurancesPolizaearService } from './insurances-polizaear.service';

describe('InsurancesPolizaearService', () => {
  let service: InsurancesPolizaearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesPolizaearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
