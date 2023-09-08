import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  apiUrl = 'http://seval.ddns.net:80';

  constructor(private http: HttpClient, private apiService: ApiService, private userAuthService: UserAuthService) { }

  getDeviceData(deviceId: string, keys: string, startTime: string, endTime: string): Observable<any> {
    // const url = `${this.apiUrl}/device/getdevicedata/${encodeURIComponent(deviceId)}?keys=${encodeURIComponent(keys)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
    const token = this.userAuthService.getToken()!;
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get(this.apiUrl + '/device/getdevicedata/' + deviceId + '?keys=' + keys + '?startTime=' + startTime + '?endTime=' + endTime,
      { headers });
  }

  getAllDeviceData(deviceId: string, attribute: string): Observable<any> {
    // const url = `${this.apiUrl}/device/getdataall/${encodeURIComponent(deviceId)}?attribute=${encodeURIComponent(attribute)}`;
    const token = this.userAuthService.getToken()!;
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get(this.apiUrl + '/device/getdataall/' + deviceId + '?attribute=' + attribute, { headers });
  }
}
