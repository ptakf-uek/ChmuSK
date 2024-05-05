import { TestBed } from '@angular/core/testing';

import { MobileFunctionalitiesService } from './mobile-functionalities.service';

describe('MobileFunctionalitiesService', () => {
  let service: MobileFunctionalitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileFunctionalitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
