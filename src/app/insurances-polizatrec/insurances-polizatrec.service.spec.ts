import { TestBed } from '@angular/core/testing';

import { InsurancesPolizatrecService } from './insurances-polizatrec.service';

describe('InsurancesPolizatrecService', () => {
  let service: InsurancesPolizatrecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesPolizatrecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
