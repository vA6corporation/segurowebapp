import { TestBed } from '@angular/core/testing';

import { InsurancesViajeService } from './insurances-viaje.service';

describe('InsurancesViajeService', () => {
  let service: InsurancesViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
