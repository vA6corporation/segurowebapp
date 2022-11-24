import { TestBed } from '@angular/core/testing';

import { SeaceService } from './seace.service';

describe('SeaceService', () => {
  let service: SeaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
