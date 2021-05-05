import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCalendarProComponent } from './profile-calendar-pro.component';

describe('ProfileCalendarProComponent', () => {
  let component: ProfileCalendarProComponent;
  let fixture: ComponentFixture<ProfileCalendarProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCalendarProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCalendarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
