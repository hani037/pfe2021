import { TestBed } from '@angular/core/testing';

import { CalendarProService } from './calendarPro.service';

describe('CalendarProService', () => {
  let service: CalendarProService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarProService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
