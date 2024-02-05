import { TestBed } from '@angular/core/testing';

import { InsurancesSoatService } from './insurances-soat.service';

describe('InsurancesSoatService', () => {
  let service: InsurancesSoatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesSoatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
