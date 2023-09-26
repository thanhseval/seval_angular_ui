import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTooltip
} from "ng-apexcharts";
import { DeviceService } from '../_service/device.service';
import { DeviceData } from '../_model/device_data.model';
// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   dataLabels: ApexDataLabels;
//   yaxis: ApexYAxis;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
//   stroke: ApexStroke;
//   markers: ApexMarkers;
//   grid: ApexGrid;
//   legend: ApexLegend;
// };

@Component({
  selector: 'app-pressure-chart',
  templateUrl: './pressure-chart.component.html',
  styleUrls: ['./pressure-chart.component.css']
})
export class PressureChartComponent implements OnInit {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public stroke!: ApexStroke;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public grid!: ApexGrid;
  public tooltip!: ApexTooltip;
  public legend!: ApexLegend;
  dataAI_1_420: any;
  dataAI_2_420: any;
  dataAI_3_420: any;

  constructor(
    private deviceService: DeviceService) {
    this.initChartData()

  }
  ngOnInit() {
    this.updateDataAndChart(); // Call the updateDataAndChart() method when the component initializes
    setInterval(() => this.updateDataAndChart(), 120000); // Update every 5 seconds
  }
  async updateDataAndChart() {
    try {

      // const token = await this.loginAndGetToken();
      // const token = await this.userAuthService.getToken;
      // console.log(token);
      const deviceId = 'Device001';
      const attributeFlow = 'AI_1_420,AI_2_420,AI_3_420';

      // const pressureData = await this.fetchData(token, deviceId, attributePressure);
      // const flowData = await this.fetchData(token, deviceId, attributeFlow);
      this.deviceService.getAllDeviceData(deviceId, attributeFlow).subscribe(
        (data) => {
          var deviceDataAI_1_420: DeviceData[] = data.data.AI_1_420;
          var deviceDataAI_2_420: DeviceData[] = data.data.AI_2_420;
          var deviceDataAI_3_420: DeviceData[] = data.data.AI_3_420;

          //sort data
          deviceDataAI_1_420.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateA.getTime() - dateB.getTime();
            } else {
              // Handle cases where the date strings are invalid
              return 0; // You can choose to handle this differently
            }

          });
          deviceDataAI_2_420.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateA.getTime() - dateB.getTime();
            } else {
              // Handle cases where the date strings are invalid
              return 0; // You can choose to handle this differently
            }

          });
          deviceDataAI_3_420.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateA.getTime() - dateB.getTime();
            } else {
              // Handle cases where the date strings are invalid
              return 0; // You can choose to handle this differently
            }

          });

          if (deviceDataAI_1_420.length > 100) {
            deviceDataAI_1_420 = deviceDataAI_1_420.slice(-100);
          }
          if (deviceDataAI_2_420.length > 100) {
            deviceDataAI_2_420 = deviceDataAI_2_420.slice(-100);
          }
          if (deviceDataAI_3_420.length > 100) {
            deviceDataAI_3_420 = deviceDataAI_3_420.slice(-100);
          }

          this.dataAI_1_420 = deviceDataAI_1_420;
          this.dataAI_2_420 = deviceDataAI_2_420;
          this.dataAI_3_420 = deviceDataAI_3_420;

          this.series = [
            { name: "Áp suất trước van ", data: this.dataAI_1_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
            { name: "Áp suất sau van ", data: this.dataAI_2_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
            { name: "Áp suất điểm bất lợi", data: this.dataAI_3_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
          ];
        },
        (error) => {
          console.log(error);
        }
      );

      // Update the pressureChart series similarly

    } catch (error) {
      console.error('Data Error:', error);
    }
  }

  public initChartData(): void {
    this.series = [

    ],
      this.chart = {
        height: 350,
        type: "line",
        stacked: false,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        },
        fontFamily: "Roboto, sans-serif",
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000, // Adjust the speed as needed
          },
        },
      },
      this.dataLabels = {
        enabled: false
      },
      this.stroke = {
        width: 2,
        curve: "smooth"
      },
      this.xaxis = {
        // categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009]
        type: 'datetime',
        labels: {
          datetimeUTC: true,
          format: 'dd/MM/yyyy HH:mm:ss'
        }
      },
      this.markers = {
        // size: 2,
        // hover: {
        //   size: 6
        // }
      },
      this.title = {
        text: "Áp lực nước",
        align: "left"
      },
      this.yaxis = {
        labels: {
          formatter: function (val) {
            return val.toFixed(1); // Hiển thị giá trị thực tế
          },
        },
        title: {
          text: 'Giá trị'
        },
        tickAmount: 5, // Số lượng mức chia trục y
      },
      this.legend = {
        position: "bottom",
        horizontalAlign: "center",
        offsetY: 7
      },
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
