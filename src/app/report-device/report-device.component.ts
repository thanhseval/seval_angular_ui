import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../_model/device.model';
import { DeviceService } from '../_service/device.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DeviceData } from '../_model/device_data.model';


@Component({
  selector: 'app-report-device',
  templateUrl: './report-device.component.html',
  styleUrls: ['./report-device.component.css']
})
export class ReportDeviceComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'value', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  device!: Device;
  deviceId!: string;

  dataAI_1_420: any;
  dataAI_2_420: any;
  dataAI_3_420: any;

  range!: FormGroup;


  constructor(
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.device = this.activatedRoute.snapshot.data['device'];
    this.deviceId = this.device.device_id;

    const today = new Date();

    this.range = this.formBuilder.group({
      start: new FormControl<Date | null>(today),
      end: new FormControl<Date | null>(today),
    });
    this.getDataChart(this.range);
    // this.updateDataAndChart(); // Call the updateDataAndChart() method when the component initializes
    setInterval(() => this.getDataChart(this.range), 120000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
        console.log(data);
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

        this.dataAI_1_420 = deviceDataAI_1_420;
        this.dataAI_2_420 = deviceDataAI_2_420;
        this.dataAI_3_420 = deviceDataAI_3_420;

        const combinedData: PeriodicElement[] = [];

        [deviceDataAI_1_420, deviceDataAI_2_420, deviceDataAI_3_420].forEach((deviceData, index) => {
          deviceData.forEach((item) => {
            combinedData.push({
              name: `AI_${index + 1}_420`,
              position: combinedData.length + 1,
              date: this.formatDate(item.updated_at),
              value: item.value
            });
          });
        });
        
        this.dataSource.data = combinedData;

      },
      (error) => {
        console.log(error);
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = String(date.getFullYear());

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  date: string;
  value: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
];