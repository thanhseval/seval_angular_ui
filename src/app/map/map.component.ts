import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import 'leaflet.awesome-markers';
import { AddNewProblemComponent } from '../add-new-problem/add-new-problem.component';
import { ReportProblemComponent } from '../report-problem/report-problem.component';
import { SearchProplemComponent } from '../search-proplem/search-proplem.component';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
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
    zoom: 16,
    minZoom: 10,
    maxBounds: Leaflet.latLngBounds(
      Leaflet.latLng(12.062244, 109.152574),
      Leaflet.latLng(8.384617, 103.712340)
    ),
    center: { lat: 10.818873, lng: 106.804130 }
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initMap();
    this.initMarkers();
    this.drawPolyline();
    this.refreshMap();
  }

  initMap() {
    this.map = Leaflet.map('map', this.options);
  }

  refreshMap(){    
    this.map.off();
    this.map.remove();
  }

  initMarkers() {
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

    const initialMarkers = [
      {
        position: { lat: 10.7743, lng: 106.6669 },
        icon: markerIconError,
        info: "Marker 1 Info"
      },
      {
        position: { lat: 10.81906, lng: 106.80420 },
        icon: markerIconNormal,
        info: "Marker 2 Info"
      },
      {
        position: { lat: 10.820135904591176, lng: 106.80583252267942 },
        icon: markerIconNormal,
        info: "Marker 3 Info"
      },
      {
        position: { lat: 10.817925, lng: 106.805001 },
        icon: markerIconNormal,
        info: "Marker 4 Info"
      },
      {
        position: { lat: 10.823538171781397, lng: 106.80824158858708 },
        icon: markerIconWarning,
        info: "Marker 5 Info"
      },
      {
        position: { lat: 10.821857975530754, lng: 106.80387798475797 },
        icon: markerIconError,
        info: "Marker 6 Info"
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b><br>${data.info}<br><a href="https://www.google.com/" target="_blank">Link</a>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { icon: data.icon, draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  drawPolyline() {
    const latLngs: Leaflet.LatLngExpression[] = [
      [10.81906, 106.80420],// Điểm đầu
      [10.81823, 106.80396], // Điểm giữa 
      [10.81814644539765, 106.8042635914664],
      [10.818946194901434, 106.80447560468325],
      [10.81814644539765, 106.8042635914664],
      [10.817925, 106.805001],// điểm cuối
      [10.819391816359863, 106.80551866892195],
      [10.81962165281922, 106.80566099097489],
      [10.820135904591176, 106.80583252267942],
      [10.820824303581313, 106.80450207312413],
      [10.82125604052353, 106.8045287604199],
      [10.82170127289487, 106.80461727330987],
      [10.821857975530754, 106.80387798475797],
      [10.82170127289487, 106.80461727330987],
      [10.82125604052353, 106.8045287604199],
      [10.821397844240586, 106.80362952910714],
      [10.821548080539992, 106.80362195535602],
      [10.821894274473927, 106.80372562066366],
      [10.821548080539992, 106.80362195535602],
      [10.820814962646832, 106.8035948429035],
      [10.820705628435256, 106.80430263258638],
      [10.820814962646832, 106.8035948429035],

      [10.82109532283764, 106.80360742584149],

      [10.820974586033929, 106.80450509882354],

      [10.820824303581313, 106.80450207312413],
      [10.820126755531824, 106.8058256395369],
      [10.820326137964148, 106.80586623784377],
      [10.82163733591764, 106.80657467310814],
      [10.822304246105052, 106.80704123869249],
      [10.822590837076065, 106.80722264302626],
      [10.823060647730179, 106.80767472231719],
      [10.82339681850573, 106.80804245820957],
      [10.823538171781397, 106.80824158858708]
    ];

    const polyline = Leaflet.polyline(latLngs, { color: 'blue' }).addTo(this.map);
  }


  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
    this.drawPolyline();
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
}
