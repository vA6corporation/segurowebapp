import { TestBed } from '@angular/core/testing';

import { InsurancesAccidentesService } from './insurances-accidentes.service';

describe('InsurancesAccidentesService', () => {
  let service: InsurancesAccidentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesAccidentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
