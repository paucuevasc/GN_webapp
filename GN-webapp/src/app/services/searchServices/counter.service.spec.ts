import { TestBed } from '@angular/core/testing';

import { VoteListService } from './voteList.service';

describe('CounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteListService = TestBed.get(VoteListService);
    expect(service).toBeTruthy();
  });
});
