import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import 'leaflet.awesome-markers';
import { AddNewProblemComponent } from '../add-new-problem/add-new-problem.component';
import { ReportProblemComponent } from '../report-problem/report-problem.component';
import { SearchProplemComponent } from '../search-proplem/search-proplem.component';
import { DeviceLocation } from '../_model/device_location.model';
import { DeviceService } from '../_service/device.service';
import { MarkerData } from '../_model/marker_data.model';
import { DeviceData } from '../_model/device_data.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  deviceLocation: DeviceLocation[] = [];

  refreshTable: boolean = false;

  deviceId!: string;

  lastDataPI_1: any;
  lastDataAI_1_420: any;
  lastDataAI_2_420: any;
  lastDataAI_3_420: any;
  lastDataDI_1_485: any;
  lastDataBat: any;

  fmDatePI_1: any;
  fmDateAI_1_420: any;
  fmDateAI_2_420: any;
  fmDateAI_3_420: any;
  fmDateDI_1_485: any;
  fmDateBat: any;

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // {
        //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // }
      )
    ],
    zoom: 16.5,
    minZoom: 10,
    maxBounds: Leaflet.latLngBounds(
      Leaflet.latLng(12.062244, 109.152574),
      Leaflet.latLng(8.384617, 103.712340)
    ),
    center: { lat: 10.818311550966524, lng: 106.8043076992035 }
  }

  constructor(public dialog: MatDialog,
    private deviceService: DeviceService,
    private router: Router,
    private ngZone: NgZone,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initMap();
    // this.initMarkers();
    this.getDeviceLocation();
    this.refreshMap();
  }

  initMap() {
    this.map = Leaflet.map('map', this.options);
  }

  refreshMap() {
    this.map.off();
    this.map.remove();
  }

  // initMarkers() {
  //   const markerIconError = Leaflet.AwesomeMarkers.icon({
  //     icon: 'bolt', // Biểu tượng sấm sét
  //     markerColor: 'red', // Màu sắc của ô tròn
  //     prefix: 'fa' // Sử dụng font-awesome icons
  //   });
  //   // Tạo biểu tượng màu đỏ 
  //   const markerIconNormal = Leaflet.AwesomeMarkers.icon({
  //     icon: 'bolt', // Biểu tượng sấm sét
  //     markerColor: 'green', // Màu sắc của ô tròn
  //     prefix: 'fa' // Sử dụng font-awesome icons
  //   });
  //   // Tạo biểu tượng màu vàng 
  //   const markerIconWarning = Leaflet.AwesomeMarkers.icon({
  //     icon: 'bolt', // Biểu tượng sấm sét
  //     markerColor: 'orange', // Màu sắc của ô tròn
  //     prefix: 'fa' // Sử dụng font-awesome icons
  //   });
  //   // Tạo biểu tượng màu vàng 
  //   const markerIconBalck = Leaflet.AwesomeMarkers.icon({
  //     icon: 'bolt', // Biểu tượng sấm sét
  //     markerColor: 'black', // Màu sắc của ô tròn
  //     prefix: 'fa' // Sử dụng font-awesome icons
  //   });
  //   // Icon cho marker
  //   const markerVan = Leaflet.icon({
  //     iconUrl: 'assets/img/Van.png',
  //     iconSize: [25, 50],
  //     //iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //   });
  //   const markerVanBuom = Leaflet.icon({
  //     iconUrl: 'assets/img/van bướm.jpg',
  //     iconSize: [25, 30],
  //     //iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //   });
  //   const markerDHLL = Leaflet.icon({
  //     iconUrl: 'assets/img/black.png',
  //     iconSize: [25, 25],
  //     //iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //   });
  //   const markerDHLLKV = Leaflet.icon({
  //     iconUrl: 'assets/img/LED_XANH.png',
  //     iconSize: [50, 50],
  //     //iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //   });
  //   const markerDHLLT = Leaflet.icon({
  //     iconUrl: 'assets/img/LED_CAM.png',
  //     iconSize: [60, 60],
  //     //iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //   });
  //   const markerDCL = Leaflet.icon({
  //     iconUrl: 'assets/img/blue.png',
  //     iconSize: [20, 20],
  //     //iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //   });
  //   const markerDBL = Leaflet.icon({
  //     iconUrl: 'assets/img/red.png',
  //     iconSize: [25, 25],
  //     //iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //   });
  //   const initialMarkers1: MarkerData[] = [];

  //   this.deviceLocation.forEach((dv) => {
  //     const longitude = parseInt(dv.longitude);
  //     const latitude = parseInt(dv.latitude);
  //     const data: MarkerData = {
  //       position: { lat: longitude, lng: latitude },
  //       icon: markerIconNormal,
  //       info: dv.device_id,
  //     };
  //     initialMarkers1.push(data);
  //   });
  //   // const initialMarkers1 = [
  //   //   {
  //   //     position: { lat: 10.84333813176367, lng: 106.78027616592776 },
  //   //     icon: markerIconNormal,
  //   //     info: "Van giảm áp 1"
  //   //   },

  //   // ];
  //   console.log(this.deviceLocation)
  //   console.log(initialMarkers1)

  //   for (let index = 0; index < initialMarkers1.length; index++) {
  //     const data = initialMarkers1[index];
  //     const marker = this.generateMarker(data, index);
  //     marker.addTo(this.map).bindPopup(`${data.info}`);
  //     this.map.panTo(data.position);
  //     this.markers.push(marker)
  //   }    
  // }

  getDeviceLocation() {
    const markerIconError = Leaflet.AwesomeMarkers.icon({
      icon: 'bolt', // Biểu tượng sấm sét
      markerColor: 'red', // Màu sắc của ô tròn
      prefix: 'fa' // Sử dụng font-awesome icons
    });
    // Tạo biểu tượng màu đỏ 
    const markerIconNormal = Leaflet.AwesomeMarkers.icon({
      icon: 'bolt', // Biểu tượng sấm sét
      markerColor: 'green', // Màu sắc của ô tròn
      prefix: 'fa' // Sử dụng font-awesome icons
    });
    // Tạo biểu tượng màu vàng 
    const markerIconWarning = Leaflet.AwesomeMarkers.icon({
      icon: 'bolt', // Biểu tượng sấm sét
      markerColor: 'orange', // Màu sắc của ô tròn
      prefix: 'fa' // Sử dụng font-awesome icons
    });
    // Tạo biểu tượng màu vàng 
    const markerIconBalck = Leaflet.AwesomeMarkers.icon({
      icon: 'bolt', // Biểu tượng sấm sét
      markerColor: 'black', // Màu sắc của ô tròn
      prefix: 'fa' // Sử dụng font-awesome icons
    });
    this.deviceService.getDeviceLocation().subscribe(
      (rep) => {
        rep.forEach((device: DeviceLocation) => {
          this.deviceLocation.push(device);
          const longitude = parseFloat(device.longitude);
          const latitude = parseFloat(device.latitude);
          const markerIcon = markerIconNormal;

          const marker = Leaflet.marker({ lat: latitude, lng: longitude }, { icon: markerIcon })
            .on('click', () => {
              this.getLatestDataAndShowPopup(device.device_id, marker);
            })
            .addTo(this.map);
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }



  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { icon: data.icon, draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    // this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  openDialogAddNewProblem(): void {
    const dialogRef = this.dialog.open(AddNewProblemComponent, {
      height: 'fit-content',
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogSearchProblem(): void {
    const dialogRef = this.dialog.open(SearchProplemComponent, {
      height: 'fit-content',
      width: '95%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogReportProblem(): void {
    const dialogRef = this.dialog.open(ReportProblemComponent, {
      height: 'fit-content',
      width: '95%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getLatestDataAndShowPopup(deviceId: string, marker: Leaflet.Marker) {
    this.deviceService.getDeviceLastData(deviceId, 'PI_1,AI_1_420,AI_2_420,AI_3_420,Bat,DI_1_485').subscribe(
      (data) => {
        this.ngZone.run(() => {
          // console.log(data);
          this.deviceId = deviceId;
          this.lastDataPI_1 = data.data.PI_1;
          this.lastDataAI_1_420 = data.data.AI_1_420;
          this.lastDataAI_2_420 = data.data.AI_2_420;
          this.lastDataAI_3_420 = data.data.AI_3_420;
          this.lastDataDI_1_485 = data.data.DI_1_485;
          this.lastDataBat = data.data.Bat;
          this.refreshTable = true;

          this.fmDatePI_1 = this.lastDataPI_1?.updated_at ?
            this.datePipe.transform(this.lastDataPI_1.updated_at, 'HH:mm:ss dd/MM/yyyy', 'UTC') : 'N/A';

          this.fmDateAI_1_420 = this.lastDataAI_1_420?.updated_at ?
            this.datePipe.transform(this.lastDataAI_1_420.updated_at, 'HH:mm:ss dd/MM/yyyy', 'UTC') : 'N/A';

          this.fmDateAI_2_420 = this.lastDataAI_2_420?.updated_at ?
            this.datePipe.transform(this.lastDataAI_2_420.updated_at, 'HH:mm:ss dd/MM/yyyy', 'UTC') : 'N/A';

          this.fmDateAI_3_420 = this.lastDataAI_3_420?.updated_at ?
            this.datePipe.transform(this.lastDataAI_3_420.updated_at, 'HH:mm:ss dd/MM/yyyy', 'UTC') : 'N/A';

          this.fmDateDI_1_485 = this.lastDataDI_1_485?.updated_at ?
            this.datePipe.transform(this.lastDataDI_1_485.updated_at, 'HH:mm:ss dd/MM/yyyy', 'UTC') : 'N/A';

          this.fmDateBat = this.lastDataBat?.updated_at ?
            this.datePipe.transform(this.lastDataBat.updated_at, 'HH:mm:ss dd/MM/yyyy', 'UTC') : 'N/A';

          const markerPopupContent = `
        <div>
        <p><b>Thông số của thiết bị: ${this.deviceId}</b></p>
          <p>Áp suất trước van: ${this.lastDataAI_2_420?.value} bar</p>
          <p>Áp suất sau van: ${this.lastDataAI_3_420?.value} bar</p>
          <p>Áp suất điểm bất lợi: ${this.lastDataAI_1_420?.value} bar</p>
          <p>Lưu lượng: ${this.lastDataDI_1_485?.value}</p>
          <p>Dung lượng pin: ${this.lastDataBat?.value} %</p>
        </div>
      `;

          const markerPopup = Leaflet.popup().setContent(markerPopupContent);
          Leaflet.popup().setLatLng(this.map.getCenter()).setContent(markerPopupContent).openOn(this.map);
          marker.bindPopup(markerPopup).openPopup();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // preparePopupContent(deviceId: any, data: any[]): string {
  //   // Process and format data to display in the popup
  //   let popupContent = `<div>
  //     <h3>Thông số ${deviceId}</h3>`;
  //   data.forEach((entry) => {
  //     Object.keys(entry).forEach((key) => {
  //       const device = entry[key];
  //       popupContent += `<p>Last ${key}: ${device.value} - Thời gian ${device.updated_at}</p>`;

  //     });
  //   });
  //   popupContent += `<button class="p-2" type="button" mat-raised-button color="warn"
  //   (myClick)="showControlDetails(${deviceId})">Xem chi
  //   tiết</button>`;
  //   popupContent += `</div>`;
  //   return popupContent;
  // }

  showControlDetails(device_id: string) {
    this.router.navigate(['/controller-iot', { device_id: device_id }]);
  }
  showReport(device_id: string) {
    this.router.navigate(['/report-device', { device_id: device_id }]);
  }
}