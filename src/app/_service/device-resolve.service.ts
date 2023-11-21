import { Injectable } from '@angular/core';
import { DeviceService } from './device.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, mergeMap, of } from 'rxjs';
import { Device } from '../_model/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceResolveService implements Resolve<Device> {


  constructor(private deviceService: DeviceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Device>|Promise<Device>|Device {

    const device_id = route.paramMap.get('device_id') ?? '';
    const keys = 'DO_1,DO_2,DO_3,DO_4,DO_5,DO_6';

    // Fetch the device status from the backend
    return this.deviceService.getDeviceStatus(device_id, keys).pipe(
      // Merge the observable of observables into a single observable
      map((device: Device) => {
        device.device_id = device_id;
        return device;
      })
    );
  }
}