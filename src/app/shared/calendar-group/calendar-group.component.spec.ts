import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarGroupComponent } from './calendar-group.component';

describe('CalendarGroupComponent', () => {
  let component: CalendarGroupComponent;
  let fixture: ComponentFixture<CalendarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
