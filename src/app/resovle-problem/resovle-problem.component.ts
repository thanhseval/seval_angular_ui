import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resovle-problem',
  templateUrl: './resovle-problem.component.html',
  styleUrls: ['./resovle-problem.component.css']
})
export class ResovleProblemComponent implements OnInit {
  query: string = '';
  showTables: boolean = false;
  device10Data: any;
  device20Data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  async search() {
    if (this.query === "Long Trường 1") {
      this.showTables = true;

      const token = await this.loginAndGetToken('dat', 'test');
      const requests = [
        {
          deviceId: 'device10',
          keys: 'PI_1,PI_2,PI_3',
          startTime: '2023-07-03 12:30:45',
          endTime: '2023-09-10 09:02:00'
        },
        {
          deviceId: 'device20',
          keys: 'PI_1,PI_2,PI_3,AI_4_420,AI_5_420',
          startTime: '2023-07-03 12:30:45',
          endTime: '2023-09-10 09:02:00'
        },
      ];
      await this.updateDataOnce(token, requests);
      this.updateDataPeriodically(token, requests);
    }
  }

  async loginAndGetToken(username: string, password: string): Promise<string> {
    const response = await this.http.post<any>('http://localhost:3000/proxy/login', { username, password }).toPromise();
    return response.token;
  }

  async getDeviceData(token: string, deviceId: string, keys: string, startTime: string, endTime: string) {
    const url = `http://localhost:3000/proxy/device/${encodeURIComponent(deviceId)}?keys=${encodeURIComponent(keys)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
    const headers = { 'Authorization': token };
    const data = await this.http.get<any>(url, { headers }).toPromise();
    return data;
  }

  updateTableWithDevice10Data(deviceData: any) {
    // Update the table with device10 data
   this.device10Data = deviceData;
  }

  updateTableWithDevice20Data(deviceData: any) {
    // Update the table with device20 data
    this.device20Data = deviceData;
    console.log(this.device20Data);
  }

  async updateDataOnce(token: string, requests: any[]) {
    const responses = await Promise.all(requests.map(request =>
      this.getDeviceData(token, request.deviceId, request.keys, request.startTime, request.endTime)
    ));
    responses.forEach((response, index) => {
      if (requests[index].deviceId === 'device10') {
        this.updateTableWithDevice10Data(response);
      } else if (requests[index].deviceId === 'device20') {
        this.updateTableWithDevice20Data(response);
      }
    });
  }

  updateDataPeriodically(token: string, requests: any[]) {
    setInterval(async () => {
      await this.updateDataOnce(token, requests);
    }, 15000);  // This updates every 15 seconds.
  }
}