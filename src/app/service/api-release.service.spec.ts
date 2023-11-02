import { TestBed } from '@angular/core/testing';

import { ApiReleaseService } from './api-release.service';

describe('ApiReleaseService', () => {
  let service: ApiReleaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiReleaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
