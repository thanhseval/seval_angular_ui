import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerPumpComponent } from './controller-pump.component';

describe('ControllerPumpComponent', () => {
  let component: ControllerPumpComponent;
  let fixture: ComponentFixture<ControllerPumpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControllerPumpComponent]
    });
    fixture = TestBed.createComponent(ControllerPumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
