import { TestBed } from '@angular/core/testing';

import { InsurancesPempresarialService } from './insurances-pempresarial.service';

describe('InsurancesPempresarialService', () => {
  let service: InsurancesPempresarialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesPempresarialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
