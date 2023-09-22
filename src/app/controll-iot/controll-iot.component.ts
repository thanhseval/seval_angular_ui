import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from '../_service/user-auth.service';
import { DeviceService } from '../_service/device.service';
import { Observable } from 'rxjs';
import { DeviceData } from '../_model/device_data.model';

@Component({
  selector: 'app-controll-iot',
  templateUrl: './controll-iot.component.html',
  styleUrls: ['./controll-iot.component.css']
})
export class ControllIotComponent implements OnInit {
  query: string = 'Long Trường 1';
  showTables: boolean = false;
  device10Data: any;
  device20Data: any;
  lastDataPI_1: any;
  lastDataAI_1_420: any;
  lastDataAI_2_420: any;
  lastDataAI_3_420: any;
  lastDataBat: any;
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
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    // this.search();
    // this.getData();
    this.getLatestData();
    setInterval(() => this.getLatestData(), 30000);
    this.getStatus();
    setInterval(() => this.getStatus(), 100);
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
        // if (this.DO_04_Status === 'ON' && this.DO_06_Status === 'ON') {
        //   this.valve_status = 'Đang mở chế độ đóng hoàn toàn Đang mở chế độ mở hoàn toàn'
        // }
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
    const deviceId = 'Device001';
    // const attribute = 'PI_1,PI_2';

    return this.deviceService.getAllDeviceData(deviceId, attribute);
  }

  getLatestData() {
    this.getData('Bat,PI_1,AI_1_420,AI_2_420,AI_3_420').subscribe(
      (data) => {
        // console.log(data);
        var deviceDataPI_1: DeviceData[] = data.data.PI_1;
        var deviceDataAI_1_420: DeviceData[] = data.data.AI_1_420;
        var deviceDataAI_2_420: DeviceData[] = data.data.AI_2_420;
        var deviceDataAI_3_420: DeviceData[] = data.data.AI_3_420;
        var deviceDataBat: DeviceData[] = data.data.Bat;
        // console.log(deviceData);

        //sort data
        deviceDataPI_1.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataAI_1_420.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataAI_2_420.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataAI_3_420.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataBat.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });

        if (deviceDataPI_1 && deviceDataPI_1.length > 0) {
          this.lastDataPI_1 = deviceDataPI_1[deviceDataPI_1.length - 1];
          // console.log(this.lastDataPI_1);
        } else {
          // console.log('Data is empty.');
        }
        if (deviceDataAI_1_420 && deviceDataAI_1_420.length > 0) {
          this.lastDataAI_1_420 = deviceDataAI_1_420[deviceDataAI_1_420.length - 1];
          // console.log(this.lastDataPI_2);
        } else {
          // console.log('Data is empty.');
        }
        if (deviceDataAI_2_420 && deviceDataAI_2_420.length > 0) {
          this.lastDataAI_2_420 = deviceDataAI_2_420[deviceDataAI_2_420.length - 1];
          // console.log(this.lastDataPI_3);
        } else {
          // console.log('Data is empty.');
        }
        if (deviceDataAI_3_420 && deviceDataAI_3_420.length > 0) {
          this.lastDataAI_3_420 = deviceDataAI_3_420[deviceDataAI_3_420.length - 1];
          // console.log(this.lastDataPI_4);
        } else {
          // console.log('Data is empty.');
        }
        if (deviceDataBat && deviceDataBat.length > 0) {
          this.lastDataBat = deviceDataBat[deviceDataBat.length - 1];
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

  // async search() {
  //   if (this.query === "Long Trường 1") {
  //     this.showTables = true;

  //     // const token = await this.loginAndGetToken('dat', 'test');
  //     const token = await this.userAuthService.getToken();
  //     const requests = [
  //       {
  //         deviceId: 'device10',
  //         keys: 'PI_1,PI_2,PI_3',
  //         startTime: '2023-07-03 12:30:45',
  //         endTime: '2023-09-10 00:00:00'
  //       },
  //       {
  //         deviceId: 'device20',
  //         keys: 'PI_1,PI_2,PI_3,AI_4_420,AI_5_420',
  //         startTime: '2023-07-03 12:30:45',
  //         endTime: '2023-09-10 00:00:00'
  //       },
  //     ];
  //     await this.updateDataOnce(token, requests);
  //     this.updateDataPeriodically(token, requests);
  //   }
  // }

  // // async loginAndGetToken(username: string, password: string): Promise<string> {
  // //   const response = await this.http.post<any>('http://localhost:3000/proxy/login', { username, password }).toPromise();

  // //   return response.token;
  // // }

  // // async getDeviceData(token: string, deviceId: string, keys: string, startTime: string, endTime: string) {
  // //   const url = `http://localhost:3000/proxy/device/${encodeURIComponent(deviceId)}?keys=${encodeURIComponent(keys)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
  // //   const headers = { 'Authorization': token };
  // //   const data = await this.http.get<any>(url, { headers }).toPromise();
  // //   return data;
  // // }

  // updateTableWithDevice10Data(deviceData: any) {
  //   // Update the table with device10 data
  //   this.device10Data = deviceData;
  // }

  // updateTableWithDevice20Data(deviceData: any) {
  //   // Update the table with device20 data
  //   this.device20Data = deviceData;
  // }

  // async updateDataOnce(token: string, requests: any[]) {
  //   const responses = await Promise.all(requests.map(request =>
  //     this.deviceService.getDeviceData( request.deviceId, request.keys, request.startTime, request.endTime)
  //   ));
  //   console.log(responses);
  //   responses.forEach((response, index) => {
  //     if (requests[index].deviceId === 'device10') {
  //       this.updateTableWithDevice10Data(response);
  //     } else if (requests[index].deviceId === 'device20') {
  //       this.updateTableWithDevice20Data(response);
  //     }
  //   });
  // }

  // updateDataPeriodically(token: string, requests: any[]) {
  //   setInterval(async () => {
  //     await this.updateDataOnce(token, requests);
  //   }, 15000);  // This updates every 15 seconds.
  // }
}
