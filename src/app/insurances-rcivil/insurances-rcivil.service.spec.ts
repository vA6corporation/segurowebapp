import { TestBed } from '@angular/core/testing';

import { InsurancesRcivilService } from './insurances-rcivil.service';

describe('InsurancesRcivilService', () => {
  let service: InsurancesRcivilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesRcivilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
