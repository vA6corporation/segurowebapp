import { TestBed } from '@angular/core/testing';

import { InsurancesVehicularService } from './insurances-vehicular.service';

describe('InsurancesVehicularService', () => {
  let service: InsurancesVehicularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancesVehicularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
