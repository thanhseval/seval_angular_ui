import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from '../_service/device.service';
import { Device } from '../_model/device.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  sv1List: Device[] = [];
  sv2List: Device[] = [];
  sv3List: Device[] = [];
  plcList: Device[] = [];

  constructor(private deviceService: DeviceService,
    private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }
  public getAllProducts() {
    this.deviceService.getAllDeviceId().subscribe(
      (response) => {
        response.data.forEach((device: Device) => {
          if (device.type === 'SV1') {
            this.sv1List.push(device);
          } else if (device.type === 'SV2') {
            this.sv2List.push(device);
          } else if (device.type === 'SV3') {
            this.sv3List.push(device);
          } else {
            this.plcList.push(device);
          }
        });
      }, (error) => {
        console.log(error);
      }
    );
  }

  showControlDetails(device_id: string) {
    this.router.navigate(['/controller-iot', { device_id: device_id }]);
  }
}