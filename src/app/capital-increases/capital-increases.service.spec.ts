import { TestBed } from '@angular/core/testing';

import { CapitalIncreasesService } from './capital-increases.service';

describe('CapitalIncreasesService', () => {
  let service: CapitalIncreasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitalIncreasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
