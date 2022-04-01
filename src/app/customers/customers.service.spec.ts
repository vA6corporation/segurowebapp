import { TestBed } from '@angular/core/testing';

import { CustomerModelsService } from './customers.service';

describe('CustomerModelService', () => {
  let service: CustomerModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
