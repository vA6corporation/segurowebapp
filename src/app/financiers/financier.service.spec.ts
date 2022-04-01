import { TestBed } from '@angular/core/testing';

import { FinancierModelsService } from './financiers.service';

describe('FinancierModelService', () => {
  let service: FinancierModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancierModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
