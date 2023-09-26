import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../_service/device.service';
import { Observable } from 'rxjs';
import { DeviceData } from '../_model/device_data.model';

@Component({
  selector: 'app-controller-pump',
  templateUrl: './controller-pump.component.html',
  styleUrls: ['./controller-pump.component.css']
})
export class ControllerPumpComponent implements OnInit {
  lastDataPI_1: any;
  lastDataPI_2: any;
  lastDataPI_3: any;
  lastDataPI_4: any;
  lastDataBat: any;
  DO_3_Status: any;
  DO_4_Status: any;
  DO_5_Status: any;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    // this.search();
    // this.getData();
    // this.getLatestData();
    // setInterval(() => this.getLatestData(), 300000);
    this.getStatus();
    setInterval(() => this.getStatus(), 100);
  }

  getStatus() {
    const deviceId = '8C-F3-19-3B-2E-B9';
    const keys = 'DO_3,DO_4,DO_5';
    this.deviceService.getDeviceStatus(deviceId, keys).subscribe(
      (res) => {
        this.DO_3_Status = res.data.DO_3.status;
        this.DO_4_Status = res.data.DO_4.status;
        this.DO_5_Status = res.data.DO_5.status;
        // console.log(this.DO_3_Status);
        // console.log(this.DO_4_Status);
        // console.log(this.DO_5_Status);
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
        this.getStatus();
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

  // getLatestData() {
  //   this.getData('Bat,PI_1,PI_2,PI_3,PI_4').subscribe(
  //     (data) => {
  //       var deviceDataPI_1: DeviceData[] = data.data.PI_1;
  //       var deviceDataPI_2: DeviceData[] = data.data.PI_2;
  //       var deviceDataPI_3: DeviceData[] = data.data.PI_3;
  //       var deviceDataPI_4: DeviceData[] = data.data.PI_4;
  //       var deviceDataBat: DeviceData[] = data.data.Bat;
  //       // console.log(deviceData);
  //       if (deviceDataPI_1 && deviceDataPI_1.length > 0) {
  //         this.lastDataPI_1 = deviceDataPI_1[deviceDataPI_1.length - 1];
  //         // console.log(this.lastDataPI_1);
  //       } else {
  //         // console.log('Data is empty.');
  //       }
  //       if (deviceDataPI_2 && deviceDataPI_2.length > 0) {
  //         this.lastDataPI_2 = deviceDataPI_2[deviceDataPI_2.length - 1];
  //         // console.log(this.lastDataPI_2);
  //       } else {
  //         // console.log('Data is empty.');
  //       }
  //       if (deviceDataPI_3 && deviceDataPI_3.length > 0) {
  //         this.lastDataPI_3 = deviceDataPI_3[deviceDataPI_3.length - 1];
  //         // console.log(this.lastDataPI_3);
  //       } else {
  //         // console.log('Data is empty.');
  //       }
  //       if (deviceDataPI_4 && deviceDataPI_4.length > 0) {
  //         this.lastDataPI_4 = deviceDataPI_4[deviceDataPI_4.length - 1];
  //         // console.log(this.lastDataPI_4);
  //       } else {
  //         // console.log('Data is empty.');
  //       }
  //       if (deviceDataBat && deviceDataBat.length > 0) {
  //         this.lastDataBat = deviceDataBat[deviceDataBat.length - 1];
  //         // console.log(this.lastDataBat);
  //       } else {
  //         // console.log('Data is empty.');
  //       }

  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
