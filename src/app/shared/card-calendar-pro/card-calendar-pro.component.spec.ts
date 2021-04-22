import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalendarProComponent } from './card-calendar-pro.component';

describe('CardCalendarProComponent', () => {
  let component: CardCalendarProComponent;
  let fixture: ComponentFixture<CardCalendarProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCalendarProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCalendarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
