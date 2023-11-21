import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexLegend
} from "ng-apexcharts";
import { dataSeries } from "./data-series";
import { DeviceService } from '../_service/device.service';
import { DeviceData } from '../_model/device_data.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.css']
})
export class FlowChartComponent implements OnInit {
  @Input() deviceId: string | undefined;

  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;
  public legend!: ApexLegend;
  dataPI_1: any;
  dataPI_2: any;
  dataPI_3: any;
  dataPI_4: any;
  dataBat: any;

  range!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private deviceService: DeviceService) {
    this.initChartData();
  }

  ngOnInit() {
    const today = new Date();

    this.range = this.formBuilder.group({
      start: new FormControl<Date | null>(today),
      end: new FormControl<Date | null>(today),
    });
    this.getDataChart(this.range);
    // this.updateDataAndChart(); // Call the updateDataAndChart() method when the component initializes
    setInterval(() => this.getDataChart(this.range), 120000);
    // this.updateDataAndChart(); // Call the updateDataAndChart() method when the component initializes
    // setInterval(() => this.updateDataAndChart(), 120000); // Update every 5 seconds
  }


  submitDateRange() {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (!startDate || !endDate) {
      console.error('Invalid date range');
      return;
    }
    this.getDataChart(this.range);
    // Perform the desired action using the selected date range
    // console.log('Selected date range:', startDate, endDate);
  }

  getDataChart(range: FormGroup) {
    const startDate = range.get('start')?.value;
    const endDate = range.get('end')?.value;
    if (!startDate || !endDate) {
      return; // Do nothing if no start or end date is specified
    }

    const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }) + 'T00:00:00Z';
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }) + 'T23:59:59Z';
    // console.log('Start date:', formattedStartDate);
    // console.log('End date:', formattedEndDate);


    const attributeFlow = 'PI_1';


    // Query the database for data between the specified dates
    this.deviceService.getDeviceData(this.deviceId, attributeFlow, formattedStartDate, formattedEndDate).subscribe(
      (data) => {
        var deviceDataPI_1: DeviceData[] = data.data.PI_1;

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

        this.dataPI_1 = deviceDataPI_1;
        this.series = [
          {
            name: "Lưu lượng PI_1",
            data: this.dataPI_1.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value }))
          }
        ];
      },
      (error) => {
        console.log(error);
      });
  }

  // async loginAndGetToken(): Promise<string> {
  //   // const response = await this.http.post<any>('http://localhost:3000/proxy/login', { username, password }).toPromise();
  //   // return response.token;
  //   const credentials = { username: 'dat', password: 'test' };
  //   const response = await this.apiService.login(credentials).toPromise();
  //   console.log(response);
  //   await this.apiService.saveToken(response.token);
  //   return response.token;
  // }

  // async fetchData(token: string, deviceId: string, attribute: string): Promise<any> {
  //   const url = `http://localhost:3000/proxy/device/alldata/${encodeURIComponent(deviceId)}?attribute=${encodeURIComponent(attribute)}`;
  //   const headers = { 'Authorization': token };
  //   const response = await this.http.get<any>(url, { headers }).toPromise();
  //   console.log(response);
  //   return response.data;
  // }

  // updateDataAndChart() {
  //   try {

  //     // const token = await this.loginAndGetToken();
  //     // const token = await this.userAuthService.getToken;
  //     // console.log(token);
  //     const deviceId = this.deviceId;
  //     // const attributePressure = 'AI_1,AI_2';
  //     const attributeFlow = 'PI_1';
  //     // const attributeFlow = 'AI_1_420,AI_2_420,AI_3_420,AI_4_420,Bat';
  //     // const pressureData = await this.fetchData(token, deviceId, attributePressure);
  //     // const flowData = await this.fetchData(token, deviceId, attributeFlow);
  //     this.deviceService.getAllDeviceData(deviceId, attributeFlow).subscribe(
  //       (data) => {
  //         var deviceDataPI_1: DeviceData[] = data.data.PI_1;

  //         //sort data
  //         deviceDataPI_1.sort((a, b) => {
  //           const dateA = new Date(a.updated_at);
  //           const dateB = new Date(b.updated_at);

  //           if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
  //             return dateA.getTime() - dateB.getTime();
  //           } else {
  //             // Handle cases where the date strings are invalid
  //             return 0; // You can choose to handle this differently
  //           }

  //         });

  //         if (deviceDataPI_1.length > 2900) {
  //           deviceDataPI_1 = deviceDataPI_1.slice(-2900);
  //         }

  //         this.dataPI_1 = deviceDataPI_1;
  //         this.series = [
  //           {
  //             name: "Lưu lượng PI_1",
  //             data: this.dataPI_1.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value }))
  //           }
  //         ];
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //     // Assuming the chart library uses updateSeries() method, adjust it as per your library
  //     // this.series = [
  //     //   { name: "PI_1", data: flowData.data?.PI_1.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
  //     //   { name: "PI_2", data: flowData.data?.PI_2.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) }
  //     // ];

  //     // Update the pressureChart series similarly

  //   } catch (error) {
  //     console.error('Data Error:', error);
  //   }
  // }
  public initChartData(): void {


    this.series = [

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
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000, // Adjust the speed as needed
        },
      },
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      // size: 2,
      // hover: {
      //   size: 6
      // }
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
          return val.toFixed(1); // Hiển thị giá trị thực tế
        },
      },
      title: {
        text: 'Giá trị'
      },
      tickAmount: 5, // Số lượng mức chia trục y
      // min: 0, // Giá trị tối thiểu trên trục y
      // max: 1000, // Giá trị tối đa trên trục y
    };
    this.xaxis = {
      // type: "datetime"
      type: 'datetime',
      labels: {
        datetimeUTC: true,
        format: 'dd/MM/yyyy HH:mm:ss'
      }
    };
    this.legend = {
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 7
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