import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentProComponent } from './appointment-pro.component';

describe('AppointmentProComponent', () => {
  let component: AppointmentProComponent;
  let fixture: ComponentFixture<AppointmentProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
