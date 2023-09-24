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
  array: any[] = [];

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
    this.isTimeInRange();
    setInterval(() => this.isTimeInRange(), 10000);
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
        // console.log(this.scheduleDataArr[1]);
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

  isTimeInRange() {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.deviceService.getScheduleData().subscribe(
      (response: ScheduleData[]) => {
        // console.log(response);
        this.array = [];
        response.forEach(d => this.array.push(d));
        this.array.sort((a, b) => a.id - b.id);
        this.array.forEach(element => {
          const isInRange = this.isTimeInRange1(element.start_time, element.end_time, formattedTime);
          if (element.name === 'Mở hoàn toàn' && isInRange === true && this.DO_04_Status === 'OFF') {
            this.control('DO_4_ON');
          }
          if (element.name === 'Mở hoàn toàn' && isInRange === false && this.DO_03_Status === 'OFF') {
            this.control('DO_3_ON');
          }
          if (element.name === 'Đóng hoàn toàn' && isInRange === true && this.DO_06_Status === 'OFF') {
            this.control('DO_6_ON');
          }
          if (element.name === 'Đóng hoàn toàn' && isInRange === false && this.DO_05_Status === 'OFF') {
            this.control('DO_5_ON');
          }
          if (element.name === 'Áp cao' && isInRange === true && this.DO_02_Status === 'OFF') {
            this.control('DO_2_ON');
          }
          if (element.name === 'Áp cao' && isInRange === false && this.DO_01_Status === 'OFF') {
            this.control('DO_1_ON');
          }
          if (element.name === 'Áp thấp' && isInRange === true && this.DO_01_Status === 'OFF') {
            this.control('DO_1_ON');
          }
          if (element.name === 'Áp thấp' && isInRange === false && this.DO_02_Status === 'OFF') {
            this.control('DO_2_ON');
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isTimeInRange1(startTime: string, endTime: string, currentTime: string): boolean {
    if (currentTime >= startTime && currentTime <= endTime) {
      return true;
    }
    return false; // Modify this logic as per your requirements
  }

  control(action: string) {
    this.deviceService.sendDataDeviceSV3(action).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
    this.getStatus();
  }
}
