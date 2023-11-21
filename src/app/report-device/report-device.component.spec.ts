import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDeviceComponent } from './report-device.component';

describe('ReportDeviceComponent', () => {
  let component: ReportDeviceComponent;
  let fixture: ComponentFixture<ReportDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDeviceComponent]
    });
    fixture = TestBed.createComponent(ReportDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
