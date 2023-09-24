import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdComponent } from './threshold.component';

describe('ThresholdComponent', () => {
  let component: ThresholdComponent;
  let fixture: ComponentFixture<ThresholdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThresholdComponent]
    });
    fixture = TestBed.createComponent(ThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
