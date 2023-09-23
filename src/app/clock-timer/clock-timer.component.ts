import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../_service/device.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleData } from '../_model/schedule_data.model';

@Component({
  selector: 'app-clock-timer',
  templateUrl: './clock-timer.component.html',
  styleUrls: ['./clock-timer.component.css']
})
export class ClockTimerComponent implements OnInit {
  scheduleData: any[] = [];
  currentPageIndex = 1;
  itemsPerPage = 5; // Adjust as needed
  settingsFormVisible: boolean = false;
  customSettingsFormVisible: boolean = false;
  functionName: any;
  scheduleDataArr: any[] = [];

  DO_01_Status: any;
  DO_02_Status: any;
  DO_03_Status: any;
  DO_04_Status: any;
  DO_05_Status: any;
  DO_06_Status: any;

  constructor(private deviceService: DeviceService, private router: Router) {
    // setInterval(this.capNhatTrangThaiTuDong.bind(this), 10000);
  }
  ngOnInit(): void {
    this.getStatus();
    setInterval(() => this.getStatus(), 100);
    this.getScheduleData();
  }

  show_timer(name: string) {
    this.settingsFormVisible = true;
    this.functionName = name;
  }

  closeForm() {
    this.settingsFormVisible = false;
  }

  showCustomSettings(name: string) {
    this.customSettingsFormVisible = true;
  }

  closeCustomForm() {
    this.customSettingsFormVisible = false;
  }

  updateCustomSetting() {

  }

  deleteCustomSetting() {

  }


  addSchedule(scheduleForm: NgForm) {
    this.deviceService.updateOrCreateSchedule(this.functionName, scheduleForm.value.startTime, scheduleForm.value.endTime).subscribe(
      (response: any) => {
        this.getScheduleData();
        this.closeForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getScheduleData() {
    this.deviceService.getScheduleData().subscribe(
      (response: ScheduleData[]) => {
        this.scheduleDataArr = [];
        response.forEach(d => this.scheduleDataArr.push(d));
        this.scheduleDataArr.sort((a, b) => a.id - b.id);
        // console.log(this.scheduleDataArr);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getStatus() {
    const deviceId1 = 'Device001';
    const keys1 = 'DO_1,DO_2,DO_3,DO_4,DO_5,DO_6';
    this.deviceService.getDeviceStatus(deviceId1, keys1).subscribe(
      (res) => {
        // console.log(res);
        this.DO_01_Status = res.data.DO_1.status;
        this.DO_02_Status = res.data.DO_2.status;
        this.DO_03_Status = res.data.DO_3.status;
        this.DO_04_Status = res.data.DO_4.status;
        this.DO_05_Status = res.data.DO_5.status;
        this.DO_06_Status = res.data.DO_6.status;

      },
      (err) => {
        console.log(err);
      }
    )
  }
}
