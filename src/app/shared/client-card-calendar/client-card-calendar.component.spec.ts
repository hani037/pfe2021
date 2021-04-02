import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardCalendarComponent } from './client-card-calendar.component';

describe('ClientCardCalendarComponent', () => {
  let component: ClientCardCalendarComponent;
  let fixture: ComponentFixture<ClientCardCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCardCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
