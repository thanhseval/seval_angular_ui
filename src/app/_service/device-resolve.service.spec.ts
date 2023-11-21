import { TestBed } from '@angular/core/testing';

import { DeviceResolveService } from './device-resolve.service';

describe('DeviceResolveService', () => {
  let service: DeviceResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
