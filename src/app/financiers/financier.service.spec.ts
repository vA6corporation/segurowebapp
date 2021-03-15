import { TestBed } from '@angular/core/testing';

import { FinanciersService } from './financiers.service';

describe('FinancierService', () => {
  let service: FinanciersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanciersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
