import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddValidityComponent } from './add-validity.component';

describe('AddValidityComponent', () => {
  let component: AddValidityComponent;
  let fixture: ComponentFixture<AddValidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddValidityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
