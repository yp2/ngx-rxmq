import { TestBed, inject } from '@angular/core/testing';

import { RxmqService } from './rxmq.service';

describe('RxmqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RxmqService]
    });
  });

  it('should be created', inject([RxmqService], (service: RxmqService) => {
    expect(service).toBeTruthy();
  }));
});
