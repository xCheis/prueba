import { TestBed } from '@angular/core/testing';

import { DecodeIDService } from './decode-id.service';

describe('DecodeIDService', () => {
  let service: DecodeIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecodeIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
