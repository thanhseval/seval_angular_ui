import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureChart1Component } from './pressure-chart1.component';

describe('PressureChart1Component', () => {
  let component: PressureChart1Component;
  let fixture: ComponentFixture<PressureChart1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PressureChart1Component]
    });
    fixture = TestBed.createComponent(PressureChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
