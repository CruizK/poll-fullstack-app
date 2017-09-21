import { TestBed, inject } from '@angular/core/testing';

import { PollSocketService } from './poll-socket.service';

describe('PollSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollSocketService]
    });
  });

  it('should be created', inject([PollSocketService], (service: PollSocketService) => {
    expect(service).toBeTruthy();
  }));
});
