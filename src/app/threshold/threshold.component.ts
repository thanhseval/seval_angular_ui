import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from '../_service/device.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleData } from '../_model/schedule_data.model';
import { Observable } from 'rxjs';
import { DeviceData } from '../_model/device_data.model';
import { ThresholdData } from '../_model/threshold_data.model';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.css']
})
export class ThresholdComponent implements OnInit {
  @Input() deviceId: string | undefined;

  selected = 'option2';
  selected1 = 'option2';
  scheduleData: any[] = [];
  currentPageIndex = 1;
  itemsPerPage = 5; // Adjust as needed
  settingsFormVisible: boolean = false;
  customSettingsFormVisible: boolean = false;

  functionName: any;
  thresholdDataArr: any[] = [];
  array: any[] = [];

  lastDataPI_1: any;
  lastDataAI_1_420: any;
  lastDataAI_2_420: any;
  lastDataAI_3_420: any;
  lastDataBat: any;

  DO_3_Status: any;
  DO_4_Status: any;
  DO_5_Status: any;

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
    this.getLatestData();
    setInterval(() => this.getLatestData(), 29000);
    this.getStatus();
    setInterval(() => this.getStatus(), 29000);
    this.getThresholdData();
    setTimeout(() => {
      this.isExceedTheThreshold();
      setInterval(() => this.isExceedTheThreshold(), 30000);
    }, 30000);
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


  addThreshold(scheduleForm: NgForm) {
    // console.log(scheduleForm.value);
    // console.log(scheduleForm.value.limit1,scheduleForm.value.sslimit1,scheduleForm.value.limit2,scheduleForm.value.limit2);
    this.deviceService.updateThreshold(scheduleForm.value.limit1, scheduleForm.value.sslimit1, scheduleForm.value.limit2, scheduleForm.value.sslimit2).subscribe(
      (response: any) => {
        this.getThresholdData();
        this.closeForm();
      },
      (error) => {
        console.log(error);
      }
    );

  }

  getThresholdData() {
    this.deviceService.getThreshold().subscribe(
      (response: ThresholdData[]) => {
        this.thresholdDataArr = [];
        response.forEach(d => this.thresholdDataArr.push(d));
        this.thresholdDataArr.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isExceedTheThreshold() {
    this.getStatus();
    this.getLatestData();

    this.deviceService.getThreshold().subscribe(
      (response: ThresholdData[]) => {
        this.array = [];
        response.forEach(d => this.array.push(d));
        this.array.forEach(element => {
          if (this.DO_04_Status === 'OFF' && element.th1 >= this.lastDataAI_1_420.value && element.th1 !== '') {
            this.control('DO_4_ON');
          }
          if (this.DO_03_Status === 'OFF' && element.th1 < this.lastDataAI_1_420.value && element.th1 !== '') {
            this.control('DO_3_ON');
          }
          if (this.DO_5_Status === 'OFF' && element.th2 >= this.lastDataAI_3_420.value && element.th2 !== '') {
            this.ON('DO_5', 'ON');
          }
          if (this.DO_5_Status === 'ON' && element.th2 < this.lastDataAI_3_420.value && element.th2 !== '') {
            this.ON('DO_5', 'OFF');
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getData(attribute: string): Observable<any> {
    // const deviceId = '8C-F3-19-3B-2E-B9';
    // const attribute = 'PI_1,PI_2';

    return this.deviceService.getAllDeviceData(this.deviceId, attribute);
  }

  getLatestData() {
    this.deviceService.getDeviceLastData(this.deviceId, 'PI_1,AI_1_420,AI_2_420,AI_3_420,Bat').subscribe(
      (data) => {
        // console.log(data);
        this.lastDataPI_1 = data.data.PI_1;
        this.lastDataAI_1_420 = data.data.AI_1_420;
        this.lastDataAI_2_420 = data.data.AI_2_420;
        this.lastDataAI_3_420 = data.data.AI_3_420;
        this.lastDataBat = data.data.Bat;


      },
      (error) => {
        console.log(error);
      }
    );

  }

  control(action: string) {
    this.deviceService.sendDataDeviceSV3(this.deviceId, action).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  ON(deviceKey: string, action: string) {
    this.deviceService.sendDataDevicePLC(deviceKey, action).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getStatus() {
    const deviceId = '8C-F3-19-3B-2E-B9';
    const keys = 'DO_5';
    this.deviceService.getDeviceStatus(deviceId, keys).subscribe(
      (res) => {
        // console.log(res);
        this.DO_5_Status = res.data.DO_5.status;
        // console.log('DO_0 ' + this.DO_0_Status);
        // console.log('DO_1 ' + this.DO_1_Status);
        // console.log('DO_2 ' + this.DO_2_Status);
        // if (this.DO_0_Status === 'ON') {
        //   this.pressure_status = 'Đang mở chế độ áp cao'
        // } else {
        //   this.pressure_status = 'Đang mở chế độ áp thấp'
        // }
        // if (this.DO_1_Status === 'ON') {
        //   this.valve_status = 'Đang mở chế độ mở hoàn toàn'
        // }
        // if (this.DO_2_Status === 'ON') {
        //   this.valve_status = 'Đang mở chế độ đóng hoàn toàn'
        // }
        // if (this.DO_2_Status === 'ON' && this.DO_1_Status === 'ON') {
        //   this.valve_status = 'Đang mở chế độ đóng hoàn toàn Đang mở chế độ mở hoàn toàn'
        // }
      },
      (err) => {
        console.log(err);
      }
    )
    const keys1 = 'DO_3,DO_4';
    this.deviceService.getDeviceStatus(this.deviceId, keys1).subscribe(
      (res) => {
        // console.log(res);
        this.DO_03_Status = res.data.DO_3.status;
        this.DO_04_Status = res.data.DO_4.status;
        //     // console.log('DO_0 ' + this.DO_00_Status);
        //     // console.log('DO_1 ' + this.DO_01_Status);
        //     // console.log('DO_2 ' + this.DO_02_Status);
        //     // console.log('DO_3 ' + this.DO_03_Status);
        //     // console.log('DO_4 ' + this.DO_04_Status);
        //     // console.log('DO_5 ' + this.DO_05_Status);
        //     if (this.DO_01_Status === 'ON' && this.DO_02_Status === 'OFF') {
        //       this.isSwitch1On = false;
        //       this.pressure_status = 'Đang mở chế độ áp thấp'
        //     }
        //     if (this.DO_01_Status === 'OFF' && this.DO_02_Status === 'ON') {
        //       this.isSwitch1On = true;
        //       this.pressure_status = 'Đang mở chế độ áp cao'
        //     }
        //     if (this.DO_03_Status === 'ON' && this.DO_04_Status === 'OFF') {
        //       this.isSwitch2On = false;
        //     }
        //     if (this.DO_03_Status === 'OFF' && this.DO_04_Status === 'ON') {
        //       this.isSwitch2On = true;
        //       this.valve_status = 'Đang mở chế độ mở hoàn toàn'
        //     }
        //     if (this.DO_05_Status === 'ON' && this.DO_06_Status === 'OFF') {
        //       this.isSwitch3On = false;
        //     }
        //     if (this.DO_05_Status === 'OFF' && this.DO_06_Status === 'ON') {
        //       this.isSwitch3On = true;
        //       this.valve_status_1 = 'Đang mở chế độ đóng hoàn toàn'
        //     }
        //     // if (this.DO_04_Status === 'ON' && this.DO_06_Status === 'ON') {
        //     //   this.valve_status = 'Đang mở chế độ đóng hoàn toàn Đang mở chế độ mở hoàn toàn'
        //     // }
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
