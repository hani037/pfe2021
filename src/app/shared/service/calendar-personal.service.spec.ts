import { TestBed } from '@angular/core/testing';

import { CalendarPersonalService } from './calendar-personal.service';

describe('CalendarPersonalService', () => {
  let service: CalendarPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
