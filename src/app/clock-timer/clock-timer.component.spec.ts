import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTimerComponent } from './clock-timer.component';

describe('ClockTimerComponent', () => {
  let component: ClockTimerComponent;
  let fixture: ComponentFixture<ClockTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClockTimerComponent]
    });
    fixture = TestBed.createComponent(ClockTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
