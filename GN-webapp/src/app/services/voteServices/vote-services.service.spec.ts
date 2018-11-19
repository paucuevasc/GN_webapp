import { TestBed } from '@angular/core/testing';

import { VoteServicesService } from './vote-services.service';

describe('VoteServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteServicesService = TestBed.get(VoteServicesService);
    expect(service).toBeTruthy();
  });
});
