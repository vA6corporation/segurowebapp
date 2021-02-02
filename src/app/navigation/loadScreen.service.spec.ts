import { TestBed } from '@angular/core/testing';

import { LoadScreenService } from './loadScreen.service';

describe('LoadscreenService', () => {
  let service: LoadScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
