import { TestBed } from '@angular/core/testing';

import { InsurancesSaludService } from './insurances-salud.service';

describe('InsurancesSaludService', () => {
  let service: InsurancesSaludService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesSaludService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
