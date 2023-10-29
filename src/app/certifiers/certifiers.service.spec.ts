import { TestBed } from '@angular/core/testing';

import { CertifiersService } from './certifiers.service';

describe('CertifiersService', () => {
  let service: CertifiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertifiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
