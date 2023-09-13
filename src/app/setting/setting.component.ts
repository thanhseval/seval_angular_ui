import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from '../_service/user-auth.service';
import { DeviceService } from '../_service/device.service';
import { Observable } from 'rxjs';
import { DeviceData } from '../_model/device_data.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  query: string = 'Long Trường 1';
  showTables: boolean = false;
  device10Data: any;
  device20Data: any;
  lastDataPI_1: any;
  lastDataPI_2: any;
  lastDataPI_3: any;
  lastDataPI_4: any;
  lastDataBat: any;
  DO_0_Status: any;
  DO_1_Status: any;
  DO_2_Status: any;
  DO_3_Status: any;
  DO_4_Status: any;
  DO_5_Status: any;
  valve_status: any;
  pressure_status: any;

  constructor(private http: HttpClient,
    private userAuthService: UserAuthService,
    private deviceService: DeviceService
    ) {  }

  ngOnInit() {
    // this.search();
    // this.getData();
    this.getLatestData();
    setInterval(() => this.getLatestData(), 30000);
    this.getStatus();
    setInterval(() => this.getStatus(), 100);
  }

  getStatus() {
    const deviceId = 'Device001';
    const keys = 'DO_0,DO_1,DO_2,DO_3,DO_4,DO_5';
    this.deviceService.getDeviceStatus(deviceId, keys).subscribe(
      (res) => {
        // console.log(res);
        // this.DO_0_Status = res.data.DO_0.status;
        // this.DO_1_Status = res.data.DO_1.status;
        // this.DO_2_Status = res.data.DO_2.status;
        // this.DO_3_Status = res.data.DO_0.status;
        // this.DO_4_Status = res.data.DO_1.status;
        // this.DO_5_Status = res.data.DO_2.status;

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
  }

  control( action: string) {
    this.deviceService.sendDataDeviceSV3(action).subscribe(
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
    this.getData('Bat,PI_1,PI_2,PI_3,PI_4').subscribe(
      (data) => {
        var deviceDataPI_1: DeviceData[] = data.data.PI_1;
        var deviceDataPI_2: DeviceData[] = data.data.PI_2;
        var deviceDataPI_3: DeviceData[] = data.data.PI_3;
        var deviceDataPI_4: DeviceData[] = data.data.PI_4;
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
        deviceDataPI_2.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataPI_3.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() - dateB.getTime();
          } else {
            // Handle cases where the date strings are invalid
            return 0; // You can choose to handle this differently
          }

        });
        deviceDataPI_4.sort((a, b) => {
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
          console.log(this.lastDataPI_1);
        } else {
          console.log('Data is empty.');
        }
        if (deviceDataPI_2 && deviceDataPI_2.length > 0) {
          this.lastDataPI_2 = deviceDataPI_2[deviceDataPI_2.length - 1];
          console.log(this.lastDataPI_2);
        } else {
          console.log('Data is empty.');
        }
        if (deviceDataPI_3 && deviceDataPI_3.length > 0) {
          this.lastDataPI_3 = deviceDataPI_3[deviceDataPI_3.length - 1];
          console.log(this.lastDataPI_3);
        } else {
          console.log('Data is empty.');
        }
        if (deviceDataPI_4 && deviceDataPI_4.length > 0) {
          this.lastDataPI_4 = deviceDataPI_4[deviceDataPI_4.length - 1];
          console.log(this.lastDataPI_4);
        } else {
          console.log('Data is empty.');
        }
        if (deviceDataBat && deviceDataBat.length > 0) {
          this.lastDataBat = deviceDataBat[deviceDataBat.length - 1];
          console.log(this.lastDataBat);
        } else {
          console.log('Data is empty.');
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

function ngOnDestroy() {
  throw new Error('Function not implemented.');
}
