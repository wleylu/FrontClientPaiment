import { TestBed } from '@angular/core/testing';

import { EnvoiserviceService } from './envoiservice.service';

describe('EnvoiserviceService', () => {
  let service: EnvoiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
