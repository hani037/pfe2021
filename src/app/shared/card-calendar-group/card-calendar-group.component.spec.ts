import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalendarGroupComponent } from './card-calendar-group.component';

describe('CardCalendarGroupComponent', () => {
  let component: CardCalendarGroupComponent;
  let fixture: ComponentFixture<CardCalendarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCalendarGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCalendarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
