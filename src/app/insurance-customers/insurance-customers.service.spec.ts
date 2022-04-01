import { TestBed } from '@angular/core/testing';

import { InsuranceCustomersService } from './insurance-customers.service';

describe('InsuranceCustomersService', () => {
  let service: InsuranceCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
