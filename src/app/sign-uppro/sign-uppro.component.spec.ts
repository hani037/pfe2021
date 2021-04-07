import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpproComponent } from './sign-uppro.component';

describe('SignUpproComponent', () => {
  let component: SignUpproComponent;
  let fixture: ComponentFixture<SignUpproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
