import { TestBed } from '@angular/core/testing';

import { InsurancePartnershipsService } from './insurance-partnerships.service';

describe('InsurancePartnershipsService', () => {
  let service: InsurancePartnershipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancePartnershipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
