import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  apiUrl = 'http://seval.ddns.net:80';
  token = this.userAuthService.getToken()!;


  constructor(private http: HttpClient, private userAuthService: UserAuthService) {
  }

  getDeviceData(deviceId: string, keys: string, startTime: string, endTime: string): Observable<any> {
    // const url = `${this.apiUrl}/device/getdevicedata/${encodeURIComponent(deviceId)}?keys=${encodeURIComponent(keys)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/getdevicedata/' + deviceId + '?keys=' + keys + '?startTime=' + startTime + '?endTime=' + endTime,
      { headers });
  }

  getAllDeviceData(deviceId: string, attribute: string): Observable<any> {
    // const url = `${this.apiUrl}/device/getdataall/${encodeURIComponent(deviceId)}?attribute=${encodeURIComponent(attribute)}`;
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/getdataall/' + deviceId + '?attribute=' + attribute, { headers });
  }

  getDeviceStatus(deviceId: string, keys: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/getstatus/' + deviceId + '?keys=' + keys, { headers });
  }

  sendDataDevicePLC(deviceKeys: string, action: string): Observable<any> {
    const data = {
      key: deviceKeys,
      action: action
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/mqtt/mqttsend/', data, { headers });
  }

  sendDataDeviceSV3(action: string): Observable<any> {
    const data = {
      action: action
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/mqtt/mqttcontrol/', data, { headers });
  }

  updateOrCreateSchedule(name: string, startTime: string, endTime: string): Observable<any> {
    const data = {
      name: name,
      startTime: startTime,
      endTime: endTime
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/settime/updateOrCreateSchedule', data, { headers });
  }

  getScheduleData(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/settime/getScheduleData/', { headers });
  }
}
