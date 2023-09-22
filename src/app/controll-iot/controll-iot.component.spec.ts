import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllIotComponent } from './controll-iot.component';

describe('ControllIotComponent', () => {
  let component: ControllIotComponent;
  let fixture: ComponentFixture<ControllIotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControllIotComponent]
    });
    fixture = TestBed.createComponent(ControllIotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
