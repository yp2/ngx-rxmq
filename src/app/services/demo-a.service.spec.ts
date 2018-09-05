import { TestBed, inject } from '@angular/core/testing';

import { DemoAService } from './demo-a.service';

describe('DemoAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoAService]
    });
  });

  it('should be created', inject([DemoAService], (service: DemoAService) => {
    expect(service).toBeTruthy();
  }));
});
