import { TestBed } from '@angular/core/testing';

import { InsurancesPolizacarService } from './insurances-polizacar.service';

describe('InsurancesPolizacarService', () => {
  let service: InsurancesPolizacarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesPolizacarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
