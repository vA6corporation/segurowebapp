import { TestBed } from '@angular/core/testing';

import { GuarantiesService } from './guaranties.service';

describe('GuarantiesService', () => {
  let service: GuarantiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuarantiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
