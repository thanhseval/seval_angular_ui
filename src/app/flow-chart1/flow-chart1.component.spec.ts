import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowChart1Component } from './flow-chart1.component';

describe('FlowChart1Component', () => {
  let component: FlowChart1Component;
  let fixture: ComponentFixture<FlowChart1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowChart1Component]
    });
    fixture = TestBed.createComponent(FlowChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
