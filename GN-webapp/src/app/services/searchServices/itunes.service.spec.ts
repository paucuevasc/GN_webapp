import { TestBed } from '@angular/core/testing';

import { OmdbService } from './omdb.service';

describe('ItunesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmdbService = TestBed.get(OmdbService);
    expect(service).toBeTruthy();
  });
});
