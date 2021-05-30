import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeanceComponent } from './card-seance.component';

describe('CardSeanceComponent', () => {
  let component: CardSeanceComponent;
  let fixture: ComponentFixture<CardSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSeanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
