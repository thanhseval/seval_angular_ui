import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resovle-problem',
  templateUrl: './resovle-problem.component.html',
  styleUrls: ['./resovle-problem.component.css']
})
export class ResovleProblemComponent implements OnInit {
  deviceId: string = '';
  resultDisplay: string = '';

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.pollForData();
  }

  async loginAndGetToken(username: string, password: string): Promise<string> {
    const response: any = await this.http.post('http://localhost:3001/users/login', { username, password }).toPromise();
    return response.token;
  }

  async getDeviceData(deviceId: string, token: string) {
    const url = `http://localhost:3001/device/${deviceId}`;
    const headers = { 'Authorization': token };
    const response: any = await this.http.get(url, { headers }).toPromise();
    return response;
  }

  displayResult(data: any) {
    if (data && data.data && data.data.PI_1 && data.data.PI_2) {
      this.resultDisplay = `PI_1=${data.data.PI_1}  PI_2=${data.data.PI_2}   AI_1_420=${data.data.AI_1_420}  AI_2_420=${data.data.AI_2_420}  AI_3_420=${data.data.AI_3_420}   AI_4_420=${data.data.AI_4_420}`;
    } else {
      this.resultDisplay = 'Không có dữ liệu hoặc dữ liệu không hợp lệ.';
    }
  }

  async pollForData() {
    try {
      const username = 'your_username';
      const password = 'test';
      const token = await this.loginAndGetToken(username, password);

      const data = await this.getDeviceData(this.deviceId, token);
      this.displayResult(data);

      setTimeout(() => this.pollForData(), 5000); // Poll every 5 seconds
    } catch (error) {
      console.error('Error:', error);
      setTimeout(() => this.pollForData(), 5000); // Poll every 5 seconds
    }
  }
}