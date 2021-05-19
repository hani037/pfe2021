import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibToastifyToastContainerComponent } from './lib-toastify-toast-container.component';

describe('LibToastifyToastContainerComponent', () => {
  let component: LibToastifyToastContainerComponent;
  let fixture: ComponentFixture<LibToastifyToastContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibToastifyToastContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibToastifyToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
