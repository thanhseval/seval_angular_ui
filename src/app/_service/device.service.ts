import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  PATH_OF_API = 'http://localhost:9090';

  constructor( private httpclient: HttpClient,) { }

  // public register() {
  //   return this.httpclient.post(this.PATH_OF_API + '/registerNewUser');
  // }
}
