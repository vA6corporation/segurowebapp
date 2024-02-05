import { TestBed } from '@angular/core/testing';

import { InsurancesVidaleyService } from './insurances-vidaley.service';

describe('InsurancesVidaleyService', () => {
  let service: InsurancesVidaleyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesVidaleyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
