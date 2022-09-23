import { TestBed } from '@angular/core/testing';

import { InsuranceBusinessesService } from './insurance-businesses.service';

describe('InsuranceBusinessesService', () => {
  let service: InsuranceBusinessesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceBusinessesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
