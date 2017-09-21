import { TestBed, inject } from '@angular/core/testing';

import { PollDataService } from './poll-data.service';

describe('PollDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollDataService]
    });
  });

  it('should be created', inject([PollDataService], (service: PollDataService) => {
    expect(service).toBeTruthy();
  }));
});
