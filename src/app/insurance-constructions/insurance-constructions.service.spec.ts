import { TestBed } from '@angular/core/testing';

import { InsuranceConstructionsService } from './insurance-constructions.service';

describe('InsuranceConstructionsService', () => {
  let service: InsuranceConstructionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceConstructionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
