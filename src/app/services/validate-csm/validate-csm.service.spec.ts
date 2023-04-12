import { TestBed } from '@angular/core/testing';

import { ValidateCsmService } from './validate-csm.service';

describe('ValidateCsmService', () => {
  let service: ValidateCsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateCsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
