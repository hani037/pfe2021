import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceProComponent } from './seance-pro.component';

describe('SeanceProComponent', () => {
  let component: SeanceProComponent;
  let fixture: ComponentFixture<SeanceProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeanceProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
