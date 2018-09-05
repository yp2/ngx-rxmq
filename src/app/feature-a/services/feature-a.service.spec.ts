import { TestBed, inject } from '@angular/core/testing';

import { FeatureAService } from './feature-a.service';

describe('FeatureAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureAService]
    });
  });

  it('should be created', inject([FeatureAService], (service: FeatureAService) => {
    expect(service).toBeTruthy();
  }));
});
