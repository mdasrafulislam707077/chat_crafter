import { TestBed } from '@angular/core/testing';

import { IntentsService } from './intents.service';

describe('IntentsService', () => {
  let service: IntentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
