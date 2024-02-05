import { TestBed } from '@angular/core/testing';

import { InsurancesFolaService } from './insurances-fola.service';

describe('InsurancesFolaService', () => {
  let service: InsurancesFolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesFolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
