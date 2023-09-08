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
  dataPI_1: any;
  dataPI_2: any;
  dataPI_3: any;
  dataPI_4: any;
  dataBat: any;

  constructor(
    private deviceService: DeviceService) {
    this.initChartData()

  }
  ngOnInit() {
    this.updateDataAndChart(); // Call the updateDataAndChart() method when the component initializes
    setInterval(() => this.updateDataAndChart(), 300000); // Update every 5 seconds
  }
  async updateDataAndChart() {
    try {

      // const token = await this.loginAndGetToken();
      // const token = await this.userAuthService.getToken;
      // console.log(token);
      const deviceId = 'Device001';
      const attributePressure = 'AI_1,AI_2';
      const attributeFlow = 'PI_1,PI_2,PI_3,PI_4';

      // const pressureData = await this.fetchData(token, deviceId, attributePressure);
      // const flowData = await this.fetchData(token, deviceId, attributeFlow);
      this.deviceService.getAllDeviceData(deviceId, attributeFlow).subscribe(
        (data) => {
          var deviceDataPI_1: DeviceData[] = data.data.PI_1;
          var deviceDataPI_2: DeviceData[] = data.data.PI_2;
          var deviceDataPI_3: DeviceData[] = data.data.PI_3;
          var deviceDataPI_4: DeviceData[] = data.data.PI_4;
          var deviceDataBat: DeviceData[] = data.data.Bat;

          //sort data
          deviceDataPI_1.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateA.getTime() - dateB.getTime();
            } else {
              // Handle cases where the date strings are invalid
              return 0; // You can choose to handle this differently
            }

          });
          deviceDataPI_2.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateA.getTime() - dateB.getTime();
            } else {
              // Handle cases where the date strings are invalid
              return 0; // You can choose to handle this differently
            }

          });
          deviceDataPI_3.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateA.getTime() - dateB.getTime();
            } else {
              // Handle cases where the date strings are invalid
              return 0; // You can choose to handle this differently
            }

          });
          deviceDataPI_4.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);

            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
              return dateA.getTime() - dateB.getTime();
            } else {
              // Handle cases where the date strings are invalid
              return 0; // You can choose to handle this differently
            }

          });


          this.dataPI_1 = deviceDataPI_1;
          this.dataPI_2 = deviceDataPI_2;
          this.dataPI_3 = deviceDataPI_3;
          this.dataPI_4 = deviceDataPI_4;
          this.dataBat = deviceDataBat;
          console.log(this.dataPI_1);
          this.series = [
            { name: "PI_1", data: this.dataPI_1.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
            { name: "PI_2", data: this.dataPI_2.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
            { name: "PI_3", data: this.dataPI_3.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
            { name: "PI_4", data: this.dataPI_4.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
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
      {
        name: "Series 1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      },
      {
        name: "Series 2",
        data: [23, 31, 35, 40, 45, 55, 60, 75, 85]
      },
      {
        name: "Series 3",
        data: [20, 29, 32, 45, 50, 60, 70, 88, 110]
      }
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
        title: {
          text: "Giá trị"
        }
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
