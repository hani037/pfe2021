import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarProComponent } from './calendar-pro.component';

describe('CalendarProComponent', () => {
  let component: CalendarProComponent;
  let fixture: ComponentFixture<CalendarProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
