import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { dataSeries } from "./data-series";
import { ApiService } from '../_service/api.service';

@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.css']
})
export class FlowChartComponent implements OnInit {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;

  constructor(private http: HttpClient,
    private apoService: ApiService) {
    this.initChartData();
  }

  ngOnInit() {
    this.updateDataAndChart(); // Call the updateDataAndChart() method when the component initializes
    setInterval(() => this.updateDataAndChart(), 300000); // Update every 5 seconds
  }

  async loginAndGetToken(username: string, password: string): Promise<string> {
    const response = await this.http.post<any>('http://localhost:3000/proxy/login', { username, password }).toPromise();
    return response.token;
    // const credentials = { username: 'dat', password: 'test' };
    // const response = await this.apoService.login(credentials).toPromise();
    // return response.token;
  }

  async fetchData(token: string, deviceId: string, attribute: string): Promise<any> {
    const url = `http://localhost:3000/proxy/device/alldata/${encodeURIComponent(deviceId)}?attribute=${encodeURIComponent(attribute)}`;
    const headers = { 'Authorization': token };
    const response = await this.http.get<any>(url, { headers }).toPromise();
    console.log(response);
    return response.data;
  }

  async updateDataAndChart() {
    try {

      const token = await this.loginAndGetToken('dat', 'test');
      const deviceId = 'device1';
      const attributePressure = 'AI_1,AI_2';
      const attributeFlow = 'PI_1,PI_2';

      const pressureData = await this.fetchData(token, deviceId, attributePressure);
      const flowData = await this.fetchData(token, deviceId, attributeFlow);

      // Assuming the chart library uses updateSeries() method, adjust it as per your library
      this.series = [
        { name: "PI_1", data: flowData.PI_1.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
        // { name: "PI_2", data: flowData.PI_2.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) }
      ];

      // Update the pressureChart series similarly

    } catch (error) {
      console.error('Data Error:', error);
    }
  }
  public initChartData(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }

    this.series = [
      {
        name: "XYZ MOTORS",
        data: dates
      }
    ];
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      },
      fontFamily: "Roboto, sans-serif",

    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: "Lưu lượng",
      align: "left"
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      // labels: {
      //   formatter: function (val) {
      //     return (val / 1000000).toFixed(0);
      //   }
      // },
      // title: {
      //   text: "Values"
      // }
      labels: {
        formatter: function (val) {
          return val.toFixed(2); // Hiển thị giá trị thực tế
        },
      },
      title: {
        text: 'Giá trị'
      },
      tickAmount: 5, // Số lượng mức chia trục y
      min: 0, // Giá trị tối thiểu trên trục y
      // max: 1000, // Giá trị tối đa trên trục y
    };
    this.xaxis = {
      // type: "datetime"
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'dd/MM/yyyy HH:mm:ss'
      }
    };
    this.tooltip = {
      shared: false,
      // y: {
      //   formatter: function (val) {
      //     return (val / 1000000).toFixed(0);
      //   }
      // }
      x: {
        format: 'dd/MM/yyyy HH:mm:ss', // Định dạng thời gian
      },
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    };
  }
}