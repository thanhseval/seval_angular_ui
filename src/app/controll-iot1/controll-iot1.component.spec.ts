import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllIot1Component } from './controll-iot1.component';

describe('ControllIot1Component', () => {
  let component: ControllIot1Component;
  let fixture: ComponentFixture<ControllIot1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControllIot1Component]
    });
    fixture = TestBed.createComponent(ControllIot1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
