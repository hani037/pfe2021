import { TestBed } from '@angular/core/testing';

import { UserProService } from './userPro.service';

describe('UserProService', () => {
  let service: UserProService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
