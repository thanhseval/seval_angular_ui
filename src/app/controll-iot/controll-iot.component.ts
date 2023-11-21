import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from '../_service/user-auth.service';
import { DeviceService } from '../_service/device.service';
import { Observable } from 'rxjs';
import { DeviceData } from '../_model/device_data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../_model/device.model';
import { DeviceResolveService } from '../_service/device-resolve.service';

@Component({
  selector: 'app-controll-iot',
  templateUrl: './controll-iot.component.html',
  styleUrls: ['./controll-iot.component.css']
})
export class ControllIotComponent implements OnInit {

  device!: Device;
  deviceId!: string;

  query: string = 'Long Trường 1';
  showTables: boolean = false;
  device10Data: any;
  device20Data: any;

  lastDataPI_1: any;
  lastDataAI_1_420: any;
  lastDataAI_2_420: any;
  lastDataAI_3_420: any;  
  lastDataDI_1_485: any;
  lastDataBat: any;

  lastDataEC: any;
  lastDataFCL: any;
  lastDataTurbidity: any;
  lastDataPH: any;

  DO_0_Status: any;
  DO_1_Status: any;
  DO_2_Status: any;

  DO_01_Status: any;
  DO_02_Status: any;
  DO_03_Status: any;
  DO_04_Status: any;
  DO_05_Status: any;
  DO_06_Status: any;

  valve_status: any;
  valve_status_1: any;
  pressure_status: any;

  isSwitch1On = false;
  isSwitch2On = false;
  isSwitch3On = false;

  constructor(private http: HttpClient,
    private userAuthService: UserAuthService,
    private deviceService: DeviceService,
    private deviceResolveService: DeviceResolveService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.search();
    // this.getData();
    this.device = this.activatedRoute.snapshot.data['device'];
    this.deviceId = this.device.device_id;
    // console.log(this.device);
    this.getLatestData();
    setInterval(() => this.getLatestData(), 30000);
    this.getStatus();
    setInterval(() => this.getStatus(), 1000);
  }

  onSwitchChange(action: string): void {
    if (action === 'Van_dien_1') {
      if (this.isSwitch1On) {
        console.log('Switch is ON');
        this.control('DO_2_ON');
      } else {
        console.log('Switch is OFF');
        this.control('DO_1_ON');
      }
    } else if (action === 'Van_dien_2') {
      if (this.isSwitch2On) {
        console.log('Switch is ON');
        this.control('DO_4_ON');
      } else {
        console.log('Switch is OFF');
        this.control('DO_3_ON');
      }
    } else if (action === 'Van_dien_3') {
      if (this.isSwitch3On) {
        console.log('Switch is ON');
        this.control('DO_6_ON');
      } else {
        console.log('Switch is OFF');
        this.control('DO_5_ON');
      }
    }


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
    this.getStatus();
  }

  getStatus() {
    // const deviceId = '8C-F3-19-3B-2E-B9';
    // const keys = 'DO_0,DO_1,DO_2';
    // this.deviceService.getDeviceStatus(deviceId, keys).subscribe(
    //   (res) => {
    //     // console.log(res);
    //     this.DO_0_Status = res.data.DO_0.status;
    //     this.DO_1_Status = res.data.DO_1.status;
    //     this.DO_2_Status = res.data.DO_2.status;
    //     // console.log('DO_0 ' + this.DO_0_Status);
    //     // console.log('DO_1 ' + this.DO_1_Status);
    //     // console.log('DO_2 ' + this.DO_2_Status);
    //     if (this.DO_0_Status === 'ON') {
    //       this.pressure_status = 'Đang mở chế độ áp cao'
    //     } else {
    //       this.pressure_status = 'Đang mở chế độ áp thấp'
    //     }
    //     if (this.DO_1_Status === 'ON') {
    //       this.valve_status = 'Đang mở chế độ mở hoàn toàn'
    //     }
    //     if (this.DO_2_Status === 'ON') {
    //       this.valve_status = 'Đang mở chế độ đóng hoàn toàn'
    //     }
    //     if (this.DO_2_Status === 'ON' && this.DO_1_Status === 'ON') {
    //       this.valve_status = 'Đang mở chế độ đóng hoàn toàn Đang mở chế độ mở hoàn toàn'
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // )
     ;
    const keys1 = 'DO_1,DO_2,DO_3,DO_4,DO_5,DO_6';
    this.deviceService.getDeviceStatus(this.deviceId, keys1).subscribe(
      (res) => {
        // console.log(res);
        this.DO_01_Status = res.data.DO_1.status;
        this.DO_02_Status = res.data.DO_2.status;
        this.DO_03_Status = res.data.DO_3.status;
        this.DO_04_Status = res.data.DO_4.status;
        this.DO_05_Status = res.data.DO_5.status;
        this.DO_06_Status = res.data.DO_6.status;
        // console.log('DO_0 ' + this.DO_00_Status);
        // console.log('DO_1 ' + this.DO_01_Status);
        // console.log('DO_2 ' + this.DO_02_Status);
        // console.log('DO_3 ' + this.DO_03_Status);
        // console.log('DO_4 ' + this.DO_04_Status);
        // console.log('DO_5 ' + this.DO_05_Status);
        if (this.DO_01_Status === 'ON' && this.DO_02_Status === 'OFF') {
          this.isSwitch1On = false;
          this.pressure_status = 'Đang mở chế độ áp thấp'
        }
        if (this.DO_01_Status === 'OFF' && this.DO_02_Status === 'ON') {
          this.isSwitch1On = true;
          this.pressure_status = 'Đang mở chế độ áp cao'
        }
        if (this.DO_03_Status === 'ON' && this.DO_04_Status === 'OFF') {
          this.isSwitch2On = false;
        }
        if (this.DO_03_Status === 'OFF' && this.DO_04_Status === 'ON') {
          this.isSwitch2On = true;
          this.valve_status = 'Đang mở chế độ mở hoàn toàn'
        }
        if (this.DO_05_Status === 'ON' && this.DO_06_Status === 'OFF') {
          this.isSwitch3On = false;
        }
        if (this.DO_05_Status === 'OFF' && this.DO_06_Status === 'ON') {
          this.isSwitch3On = true;
          this.valve_status_1 = 'Đang mở chế độ đóng hoàn toàn'
        }
        if (this.DO_04_Status === 'ON' && this.DO_06_Status === 'ON') {
          this.valve_status = 'Đang mở chế độ đóng hoàn toàn Đang mở chế độ mở hoàn toàn'
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  ON(deviceKey: string, action: string) {
    this.deviceService.sendDataDevicePLC(deviceKey, action).subscribe(
      (res) => {
        this.getStatus();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getData(attribute: string): Observable<any> {
     
    // const attribute = 'PI_1,PI_2';

    return this.deviceService.getAllDeviceData(this.deviceId, attribute);
  }
  getData2(attribute: string): Observable<any> {
    const deviceId = 'Device002';
    // const attribute = 'PI_1,PI_2';

    return this.deviceService.getAllDeviceData(deviceId, attribute);
  }

  getLatestData() {
    this.deviceService.getDeviceLastData(this.deviceId, 'PI_1,AI_1_420,AI_2_420,AI_3_420,Bat,DI_1_485').subscribe(
      (data) => {
        console.log(data);
        this.lastDataPI_1 = data.data.PI_1;
        this.lastDataAI_1_420 = data.data.AI_1_420;
        this.lastDataAI_2_420 = data.data.AI_2_420;
        this.lastDataAI_3_420 = data.data.AI_3_420;
        this.lastDataDI_1_485 = data.data.DI_1_485;
        this.lastDataBat = data.data.Bat;


      },
      (error) => {
        console.log(error);
      }
    );

    this.getData2('EC,FCL,Turbidity,pH').subscribe(
      (data) => {
        // console.log(data);
        // var deviceDataPI_1: DeviceData[] = data.data.PI_1;
        var deviceDataEC: DeviceData[] = data.data.EC;
        var deviceDataFCL: DeviceData[] = data.data.FCL;
        var deviceDataTurbidity: DeviceData[] = data.data.Turbidity
        var deviceDataPH: DeviceData[] = data.data.pH;
        // console.log(deviceData);

        //sort data
        // deviceDataPI_1.sort((a, b) => {
        //   const dateA = new Date(a.updated_at);
        //   const dateB = new Date(b.updated_at);

        //   if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        //     return dateA.getTime() - dateB.getTime();
        //   } else {
        //     // Handle cases where the date strings are invalid
        //     return 0; // You can choose to handle this differently
        //   }

        // });
        deviceDataEC.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataFCL.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataTurbidity.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataPH.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });

        // if (deviceDataPI_1 && deviceDataPI_1.length > 0) {
        //   this.lastDataPI_1 = deviceDataPI_1[deviceDataPI_1.length - 1];
        //   // console.log(this.lastDataPI_1);
        // } else {
        //   // console.log('Data is empty.');
        // }
        if (deviceDataEC && deviceDataEC.length > 0) {
          this.lastDataEC = deviceDataEC[deviceDataEC.length - 1];
          // console.log(this.lastDataPI_2);
        } else {
          // console.log('Data is empty.');
        }
        if (deviceDataFCL && deviceDataFCL.length > 0) {
          this.lastDataFCL = deviceDataFCL[deviceDataFCL.length - 1];
          // console.log(this.lastDataPI_3);
        } else {
          // console.log('Data is empty.');
        }
        if (deviceDataTurbidity && deviceDataTurbidity.length > 0) {
          this.lastDataTurbidity = deviceDataTurbidity[deviceDataTurbidity.length - 1];
          // console.log(this.lastDataPI_4);
        } else {
          // console.log('Data is empty.');
        }
        if (deviceDataPH && deviceDataPH.length > 0) {
          this.lastDataPH = deviceDataPH[deviceDataPH.length - 1];
          // console.log(this.lastDataBat);
        } else {
          // console.log('Data is empty.');
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  showClockTimeSetting(device_id: string) {
    this.router.navigate(['/clock-timer', { device_id: device_id }]);
  }

  showThresholdSetting(device_id: string) {
    this.router.navigate(['/threshold', { device_id: device_id }]);
  }

}
