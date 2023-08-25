import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://seval.ddns.net:80';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    const url = `${this.apiUrl}/users/login`;
    return this.http.post(url, credentials);
  }

  getDeviceData(deviceId: string, keys: string, startTime: string, endTime: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/device/getdevicedata/${encodeURIComponent(deviceId)}?keys=${encodeURIComponent(keys)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get(url, { headers });
  }

  getAllDeviceData(deviceId: string, attribute: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/device/getdataall/${encodeURIComponent(deviceId)}?attribute=${encodeURIComponent(attribute)}`;
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get(url, { headers });
  }
}
