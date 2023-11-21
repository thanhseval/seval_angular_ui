import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  apiUrl = 'http://seval.ddns.net:80';
  // apiUrl = 'https://seval.ddns.net:81';
  token = this.userAuthService.getToken()!;


  constructor(private http: HttpClient, private userAuthService: UserAuthService) {
  }

  getDeviceLastData(deviceId: any, keys: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/' + deviceId + '?keys=' + keys, { headers });
  }

  getDeviceData(deviceId: any, keys: string, startTime: string, endTime: string): Observable<any> {
    // const url = `${this.apiUrl}/device/getdevicedata/${encodeURIComponent(deviceId)}?keys=${encodeURIComponent(keys)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/getdevicedata/' + deviceId + '?keys=' + keys + '&startTime=' + startTime + '&endTime=' + endTime,
      { headers });
  }

  getAllDeviceId(): Observable<any> {
    // const url = `${this.apiUrl}/device/getdataall/${encodeURIComponent(deviceId)}?attribute=${encodeURIComponent(attribute)}`;
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/getAllDeviceId', { headers });
  }

  getAllDeviceData(deviceId: any, attribute: string): Observable<any> {
    // const url = `${this.apiUrl}/device/getdataall/${encodeURIComponent(deviceId)}?attribute=${encodeURIComponent(attribute)}`;
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/getdataall/' + deviceId + '?attribute=' + attribute, { headers });
  }

  getDeviceStatus(deviceId: any, keys: string): Observable<any> {
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

  sendDataDeviceSV3(deviceId: any, action: string): Observable<any> {
    const data = {
      action: action
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/mqtt/mqttcontrol/' + deviceId, data, { headers });
  }

  sendDataDevice003(action: string): Observable<any> {
    const data = {
      action: action
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/mqtt/mqttcontrol003/', data, { headers });
  }

  sendDataDevice004(action: string): Observable<any> {
    const data = {
      action: action
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/mqtt/mqttcontrol004/', data, { headers });
  }

  sendDataDevice005(action: string): Observable<any> {
    const data = {
      action: action
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/mqtt/mqttcontrol005/', data, { headers });
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

  getThreshold(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/setthreshold/getthreshold', { headers });
  }

  updateThreshold(th1: string, ss1: string, th2: string, ss2: string): Observable<any> {
    const data = {
      id: 1,
      th1: th1,
      ss1: ss1,
      th2: th2,
      ss2: ss2
    };
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.apiUrl + '/device/setthreshold/updatethreshold', data, { headers });
  }

  getDeviceLocation(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.apiUrl + '/device/getDevice/getAllDeviceLocation', { headers });
  }
}
