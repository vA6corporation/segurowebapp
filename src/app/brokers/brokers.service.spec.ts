import { TestBed } from '@angular/core/testing';

import { BrokersService } from './brokers.service';

describe('BrokersService', () => {
  let service: BrokersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
