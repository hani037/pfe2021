import { TestBed } from '@angular/core/testing';

import { CalendarGroupService } from './calendar-group.service';

describe('CalendarGroupService', () => {
  let service: CalendarGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
