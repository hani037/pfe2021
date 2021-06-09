import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCalendarComponent } from './selected-calendar.component';

describe('SelectedCalendarComponent', () => {
  let component: SelectedCalendarComponent;
  let fixture: ComponentFixture<SelectedCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
