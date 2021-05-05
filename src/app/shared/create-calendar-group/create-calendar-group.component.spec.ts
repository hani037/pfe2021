import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCalendarGroupComponent } from './create-calendar-group.component';

describe('CreateCalendarGroupComponent', () => {
  let component: CreateCalendarGroupComponent;
  let fixture: ComponentFixture<CreateCalendarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCalendarGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCalendarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
