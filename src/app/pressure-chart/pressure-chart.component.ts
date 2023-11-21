import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { NgIf, JsonPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  styleUrls: ['./pressure-chart.component.css'],

})
export class PressureChartComponent implements OnInit {
  @Input() deviceId: string | undefined;

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

  range!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    // private datePipe: DatePipe,
    private deviceService: DeviceService) {
    this.initChartData()

  }

  ngOnInit() {
    // console.log(this.deviceId);
    // Set default range to today
    const today = new Date();

    this.range = this.formBuilder.group({
      start: new FormControl<Date | null>(today),
      end: new FormControl<Date | null>(today),
    });
    this.getDataChart(this.range);
    // this.updateDataAndChart(); // Call the updateDataAndChart() method when the component initializes
    setInterval(() => this.getDataChart(this.range), 120000);
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


    const attributeFlow = 'AI_1_420,AI_2_420,AI_3_420';


    // Query the database for data between the specified dates
    this.deviceService.getDeviceData(this.deviceId, attributeFlow, formattedStartDate, formattedEndDate).subscribe(
      (data) => {
        // console.log(data);
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

        // if (deviceDataAI_1_420.length > 2900) {
        //   deviceDataAI_1_420 = deviceDataAI_1_420.slice(-2900);
        // }
        // if (deviceDataAI_2_420.length > 2900) {
        //   deviceDataAI_2_420 = deviceDataAI_2_420.slice(-2900);
        // }
        // if (deviceDataAI_3_420.length > 2900) {
        //   deviceDataAI_3_420 = deviceDataAI_3_420.slice(-2900);
        // }

        this.dataAI_1_420 = deviceDataAI_1_420;
        this.dataAI_2_420 = deviceDataAI_2_420;
        this.dataAI_3_420 = deviceDataAI_3_420;

        this.series = [
          { name: "Áp suất điểm bất lợi AI_1_420 ", data: this.dataAI_1_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
          { name: "Áp suất trước van AI_2_420 ", data: this.dataAI_2_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
          { name: "Áp suất sau van AI_3_420", data: this.dataAI_3_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
        ];
      },
      (error) => {
        console.log(error);
      });
  }

  // updateData(data?: any[]) {
  //   if (!data) {
  //     return;
  //   }

  //   // Process the data into a format suitable for the chart
  //   const processedData = {};

  //   for (const item of data) {
  //     const timestamp = this.datePipe.transform(item.updated_at, 'HH:mm:ss');
  //     if (!processedData[item.attribute]) {
  //       processedData[item.attribute] = [];
  //     }
  //     processedData[item.attribute].push({
  //       x: timestamp,
  //       y: item.value,
  //     });
  //   }

  //   // Update the chart series with the processed data
  //   this.series = [];
  //   for (const attribute in processedData) {
  //     this.series.push({
  //       name: attribute,
  //       data: processedData[attribute],
  //     });
  //   }

  //   // Update the chart with the new data
  //   this.chart.updateOptions({
  //     series: this.series,
  //   });
  // }


  // async updateDataAndChart() {
  //   try {

  //     // const token = await this.loginAndGetToken();
  //     // const token = await this.userAuthService.getToken;
  //     // console.log(token);
  //     // const deviceId = '8C-F3-19-3B-2E-B9';
  //     const deviceId = this.deviceId;
  //     const attributeFlow = 'AI_1_420,AI_2_420,AI_3_420';

  //     // const pressureData = await this.fetchData(token, deviceId, attributePressure);
  //     // const flowData = await this.fetchData(token, deviceId, attributeFlow);
  //     this.deviceService.getAllDeviceData(deviceId, attributeFlow).subscribe(
  //       (data) => {
  //         var deviceDataAI_1_420: DeviceData[] = data.data.AI_1_420;
  //         var deviceDataAI_2_420: DeviceData[] = data.data.AI_2_420;
  //         var deviceDataAI_3_420: DeviceData[] = data.data.AI_3_420;

  //         //sort data
  //         deviceDataAI_1_420.sort((a, b) => {
  //           const dateA = new Date(a.updated_at);
  //           const dateB = new Date(b.updated_at);

  //           if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
  //             return dateA.getTime() - dateB.getTime();
  //           } else {
  //             // Handle cases where the date strings are invalid
  //             return 0; // You can choose to handle this differently
  //           }

  //         });
  //         deviceDataAI_2_420.sort((a, b) => {
  //           const dateA = new Date(a.updated_at);
  //           const dateB = new Date(b.updated_at);

  //           if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
  //             return dateA.getTime() - dateB.getTime();
  //           } else {
  //             // Handle cases where the date strings are invalid
  //             return 0; // You can choose to handle this differently
  //           }

  //         });
  //         deviceDataAI_3_420.sort((a, b) => {
  //           const dateA = new Date(a.updated_at);
  //           const dateB = new Date(b.updated_at);

  //           if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
  //             return dateA.getTime() - dateB.getTime();
  //           } else {
  //             // Handle cases where the date strings are invalid
  //             return 0; // You can choose to handle this differently
  //           }

  //         });

  //         if (deviceDataAI_1_420.length > 2900) {
  //           deviceDataAI_1_420 = deviceDataAI_1_420.slice(-2900);
  //         }
  //         if (deviceDataAI_2_420.length > 2900) {
  //           deviceDataAI_2_420 = deviceDataAI_2_420.slice(-2900);
  //         }
  //         if (deviceDataAI_3_420.length > 2900) {
  //           deviceDataAI_3_420 = deviceDataAI_3_420.slice(-2900);
  //         }

  //         this.dataAI_1_420 = deviceDataAI_1_420;
  //         this.dataAI_2_420 = deviceDataAI_2_420;
  //         this.dataAI_3_420 = deviceDataAI_3_420;

  //         this.series = [
  //           { name: "Áp suất điểm bất lợi AI_1_420 ", data: this.dataAI_1_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
  //           { name: "Áp suất trước van AI_2_420 ", data: this.dataAI_2_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
  //           { name: "Áp suất sau van AI_3_420", data: this.dataAI_3_420.map((entry: { updated_at: string | number | Date; value: any; }) => ({ x: new Date(entry.updated_at).getTime(), y: entry.value })) },
  //         ];
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );

  //     // Update the pressureChart series similarly

  //   } catch (error) {
  //     console.error('Data Error:', error);
  //   }
  // }

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
          autoScaleYaxis: true,
          // range: [this.dataAI_1_420[this.dataAI_1_420.length - 1], this.dataAI_1_420[this.dataAI_1_420.length - 1]],
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
