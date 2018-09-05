import { TestBed, inject } from '@angular/core/testing';

import { DemoBService } from './demo-b.service';

describe('DemoBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoBService]
    });
  });

  it('should be created', inject([DemoBService], (service: DemoBService) => {
    expect(service).toBeTruthy();
  }));
});
