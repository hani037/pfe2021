import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPersonalComponent } from './calendar-personal.component';

describe('CalendarPersonalComponent', () => {
  let component: CalendarPersonalComponent;
  let fixture: ComponentFixture<CalendarPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
