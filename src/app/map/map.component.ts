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
    zoom: 16.5,
    minZoom: 10,
    maxBounds: Leaflet.latLngBounds(
      Leaflet.latLng(12.062244, 109.152574),
      Leaflet.latLng(8.384617, 103.712340)
    ),
    center: { lat: 10.836615768586432, lng: 106.7800283432007 }
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initMap();
    this.drawPolyline();
    this.initMarkers();
    this.refreshMap();
  }

  initMap() {
    this.map = Leaflet.map('map', this.options);
  }

  refreshMap() {
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
    // Icon cho marker
    const markerVan = Leaflet.icon({
      iconUrl: 'assets/img/Van.png',
      iconSize: [25, 50],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    const markerVanBuom = Leaflet.icon({
      iconUrl: 'assets/img/van bướm.jpg',
      iconSize: [25, 30],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    const markerDHLL = Leaflet.icon({
      iconUrl: 'assets/img/black.png',
      iconSize: [25, 25],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    const markerDHLLKV = Leaflet.icon({
      iconUrl: 'assets/img/LED_XANH.png',
      iconSize: [50, 50],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    const markerDHLLT = Leaflet.icon({
      iconUrl: 'assets/img/LED_CAM.png',
      iconSize: [60, 60],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    const markerDCL = Leaflet.icon({
      iconUrl: 'assets/img/blue.png',
      iconSize: [20, 20],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    const markerDBL = Leaflet.icon({
      iconUrl: 'assets/img/red.png',
      iconSize: [25, 25],
      //iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    // const initialMarkers = [
    //   {
    //     position: { lat: 10.81906, lng: 106.80420 },
    //     icon: markerIconNormal,
    //     info: "Marker 2 Info"
    //   },
    //   {
    //     position: { lat: 10.820135904591176, lng: 106.80583252267942 },
    //     icon: markerIconNormal,
    //     info: "Marker 3 Info"
    //   },
    //   {
    //     position: { lat: 10.817925, lng: 106.805001 },
    //     icon: markerIconNormal,
    //     info: "Marker 4 Info"
    //   },
    //   {
    //     position: { lat: 10.823538171781397, lng: 106.80824158858708 },
    //     icon: markerIconWarning,
    //     info: "Marker 5 Info"
    //   },
    //   {
    //     position: { lat: 10.821857975530754, lng: 106.80387798475797 },
    //     icon: markerIconError,
    //     info: "Marker 6 Info "
    //   },

    // ];
    const initialMarkers1 = [
      {
        position: { lat: 10.84333813176367, lng: 106.78027616592776 },
        icon: markerVan,
        info: "Van giảm áp 1"
      },
      {
        position: { lat: 10.841905552837986, lng: 106.77949466809916 },
        icon: markerVan,
        info: "Van giảm áp 2"
      },
      {
        position: { lat: 10.840556772110128, lng: 106.77880803504723 },
        icon: markerVan,
        info: "Van giảm áp 3"
      },
      {
        position: { lat: 10.84351199675429, lng: 106.7823364096964 },
        icon: markerVanBuom,
        info: "Van bướm"
      },
      {
        position: { lat: 10.842742600418703, lng: 106.78213617148427 },
        icon: markerDBL,
        info: "Điểm bất lợi 1"
      },
      {
        position: { lat: 10.841404535511332, lng: 106.78214767079952 },
        icon: markerDBL,
        info: "Điểm bất lợi 2"
      },
      {
        position: { lat: 10.839366046570635, lng: 106.78101687105779 },
        icon: markerDBL,
        info: "Điểm bất lợi 3"
      },
      {
        position: { lat: 10.843191103809206, lng: 106.7840838432312 },
        icon: markerDBL,
        info: "Điểm bất lợi 4"
      },
      {
        position: { lat: 10.84496106462822, lng: 106.78616482946434 },
        icon: markerDBL,
        info: "Điểm bất lợi 5"
      },
      {
        position: { lat: 10.84560119993277, lng: 106.77929569229603 },
        icon: markerDHLLT,
        info: "Đồng hồ đo lưu lượng tổng"
      },
      {
        position: { lat: 10.844254698593533, lng: 106.78049465965627 },
        icon: markerDHLLKV,
        info: "Đồng hồ đo lưu lượng khu vực 1"
      },
      {
        position: { lat: 10.844307384802534, lng: 106.781782119874 },
        icon: markerDHLLKV,
        info: "Đồng hồ đo lưu lượng khu vực 2"
      },
      {
        position: { lat: 10.843428119791424, lng: 106.78005744056586 },
        icon: markerDHLL,
        info: "Đồng hồ đo lưu lượng 1"
      },
      {
        position: { lat: 10.84213737391321, lng: 106.77909715260434 },
        icon: markerDHLL,
        info: "Đồng hồ đo lưu lượng 2"
      },
      {
        position: { lat: 10.840867130518838, lng: 106.77798070362637 },
        icon: markerDHLL,
        info: "Đồng hồ đo lưu lượng 3"
      },
      {
        position: { lat: 10.843897100762925, lng: 106.78247451782228 },
        icon: markerDHLL,
        info: "Đồng hồ đo lưu lượng 4"
      },
      {
        position: { lat: 10.841968776785402, lng: 106.78116760671539 },
        icon: markerDCL,
        info: "Điểm cách ly 1"
      },
      {
        position: { lat: 10.840693757930218, lng: 106.78057786119301 },
        icon: markerDCL,
        info: "Điểm cách ly 2"
      },
      {
        position: { lat: 10.84188447818587, lng: 106.78153224597473 },
        icon: markerDCL,
        info: "Điểm cách ly 3"
      },

    ];
    // for (let index = 0; index < initialMarkers.length; index++) {
    //   const data = initialMarkers[index];
    //   const marker = this.generateMarker(data, index);
    //   marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b><br>${data.info}<br><a href="https://www.google.com/" target="_blank">Link</a>`);
    //   this.map.panTo(data.position);
    //   this.markers.push(marker)
    // }
    for (let index = 0; index < initialMarkers1.length; index++) {
      const data = initialMarkers1[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`${data.info}<br>`);
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

    const duongchinh: Leaflet.LatLngExpression[] = [
      [10.847669530306929, 106.77578917006127],// Điểm đầu
      [10.84472307289928, 106.78085720384819], // Điểm giữa 
      [10.839883286303477, 106.77696319613585],// điểm cuối
      [10.84472307289928, 106.78085720384819],
      [10.844391682725051, 106.78153937997747],
      [10.844033416421825, 106.78262835674494],
      [10.844473346314812, 106.78538566753816],
      [10.844996914724483, 106.78625805601455],
      [10.844687383825214, 106.78648872600374],
      [10.844255357175827, 106.78763805256202]
    ];
    // const latLngs: Leaflet.LatLngExpression[] = [
    //   [10.81906, 106.80420],// Điểm đầu
    //   [10.81823, 106.80396], // Điểm giữa 
    //   [10.81814644539765, 106.8042635914664],
    //   [10.818946194901434, 106.80447560468325],
    //   [10.81814644539765, 106.8042635914664],
    //   [10.817925, 106.805001],// điểm cuối
    //   [10.819391816359863, 106.80551866892195],
    //   [10.81962165281922, 106.80566099097489],
    //   [10.820135904591176, 106.80583252267942],
    //   [10.820824303581313, 106.80450207312413],
    //   [10.82125604052353, 106.8045287604199],
    //   [10.82170127289487, 106.80461727330987],
    //   [10.821857975530754, 106.80387798475797],
    //   [10.82170127289487, 106.80461727330987],
    //   [10.82125604052353, 106.8045287604199],
    //   [10.821397844240586, 106.80362952910714],
    //   [10.821548080539992, 106.80362195535602],
    //   [10.821894274473927, 106.80372562066366],
    //   [10.821548080539992, 106.80362195535602],
    //   [10.820814962646832, 106.8035948429035],
    //   [10.820705628435256, 106.80430263258638],
    //   [10.820814962646832, 106.8035948429035],

    //   [10.82109532283764, 106.80360742584149],

    //   [10.820974586033929, 106.80450509882354],

    //   [10.820824303581313, 106.80450207312413],
    //   [10.820126755531824, 106.8058256395369],
    //   [10.820326137964148, 106.80586623784377],
    //   [10.82163733591764, 106.80657467310814],
    //   [10.822304246105052, 106.80704123869249],
    //   [10.822590837076065, 106.80722264302626],
    //   [10.823060647730179, 106.80767472231719],
    //   [10.82339681850573, 106.80804245820957],
    //   [10.823538171781397, 106.80824158858708]
    // ];

    const duongnhanh1: Leaflet.LatLngExpression[] = [
      [10.843464404344928, 106.77991127924514],// Điểm đầu
      [10.843008667045646, 106.78132480327584], // Điểm giữa 
      [10.842742600418703, 106.78213617148427],// điểm cuối
      [10.843008667045646, 106.78132480327584],
      [10.843282713030032, 106.78044725256656],
      [10.842639938444314, 106.78010929425942],
      [10.842110438670229, 106.7815845090922],
      // [10.842846732870095, 106.78196672400660],
      [10.84290073648815, 106.7819278319793],
      [10.843096993461284, 106.78203176758424],
      [10.8431924875899, 106.78183529578244],
      [10.843405867436779, 106.78198549947452],
      [10.843434844935116, 106.78188893995818],
      [10.842931689792554, 106.78152952398074],
      [10.84224281369489, 106.78124185708538],
      [10.842611619443538, 106.78138937856868],
      [10.842472000177885, 106.78175684117248],
      [10.842611619443538, 106.78138937856868],
      [10.84224281369489, 106.78124185708538],
      [10.842379659388568, 106.78083259893704],
      [10.84304877774773, 106.78115178179691],
      [10.842379659388568, 106.78083259893704],
      [10.842437614581257, 106.78069580628278],
      [10.843317478399914, 106.7811142308722],
      [10.843301672485884, 106.78135026525598],
      [10.843317478399914, 106.7811142308722],
      [10.842437614581257, 106.78069580628278],
      [10.842548256281539, 106.78036857679619],
      [10.843196299704307, 106.7807011707006]
    ];
    const duongnhanh2: Leaflet.LatLngExpression[] = [
      [10.842236984476289, 106.77885519278158],// Điểm đầu
      [10.841826028947635, 106.77973461687755], // Điểm giữa 
      [10.841488834246102, 106.78092505681239],
      [10.842231715819242, 106.78123607265123],
      [10.841488834246102, 106.78092505681239],
      [10.841235937970547, 106.78150418975368],
      [10.841351848790046, 106.78163824830487],
      [10.841657431644373, 106.78099476725903],
      [10.841351848790046, 106.78163824830487],
      [10.841631088307158, 106.78153636380597],
      [10.841810222954498, 106.78109665175795],
      [10.841631088307158, 106.78153636380597],
      [10.842115805340635, 106.7815739002003],

      [10.841631088307158, 106.78153636380597],
      [10.841810222954498, 106.78109665175795],
      [10.841631088307158, 106.78153636380597],
      [10.841351848790046, 106.78163824830487],
      [10.841657431644373, 106.78099476725903],
      [10.841351848790046, 106.78163824830487],
      [10.841235937970547, 106.78150418975368],

      [10.841404535511332, 106.78214767079952],
      [10.841125295782764, 106.78213694611541],
      [10.840803906338605, 106.78187419135502],
      [10.841062071657097, 106.78146129101727],
      [10.84092508600564, 106.78128969607168],
      [10.84099884751807, 106.78105375302155],
      [10.841351848790046, 106.78123071030917],
      [10.84099884751807, 106.78105375302155],
      [10.841025190910957, 106.7807159254725],
      [10.841504640256222, 106.78093578149648],
      [10.841025190910957, 106.7807159254725],
      [10.841146370488351, 106.78035128621319],
      [10.841583670294316, 106.78058722926335],
      [10.841146370488351, 106.78035128621319],
      [10.841325505425912, 106.7799812846118],
      [10.841657431644373, 106.78026548874038],
      [10.841325505425912, 106.7799812846118],
      [10.841499371586288, 106.77968635579913],
      [10.84178387963073, 106.77995447290158],
      [10.842084193384133, 106.77996519758568],
      [10.841978820171656, 106.78020114063582],
      [10.841657431644373, 106.78026548874038],
      [10.841978820171656, 106.78020114063582],
      [10.841852372267686, 106.78065157736789],
      [10.841583670294316, 106.78058722926335],
      [10.841852372267686, 106.78065157736789],
      [10.841999894817118, 106.78071056313044],
      [10.841852372267686, 106.78065157736789],
      [10.841978820171656, 106.78020114063582],
      [10.842152685952337, 106.78024403937219],
      [10.841999894817118, 106.78071056313044],
      [10.841842328877197, 106.78105976979417]
    ];
    const duongnhanh3: Leaflet.LatLngExpression[] = [
      [10.84098831016025, 106.77783037303585],// Điểm đầu
      [10.84033548719135, 106.77903280449974], // Điểm giữa 
      [10.839229060142703, 106.78031976659143],
      [10.8390709988018, 106.78064150711438],
      [10.839366046570635, 106.78101687105779],
      [10.839555719982693, 106.78065223179848],
      [10.8392922846557, 106.78025541848689],
      [10.839555719982693, 106.78065223179848],
      [10.840103170779832, 106.7796699719077],
      [10.839939841203241, 106.77947156525191],
      [10.83954995733739, 106.77925170922788],
      [10.839239103620926, 106.77954127569852],
      [10.839117923271088, 106.77982547982712],
      [10.839270715878028, 106.78014185800797],
      [10.839117923271088, 106.77982547982712],
      [10.839239103620926, 106.77954127569852],
      [10.83951834510979, 106.77993272666808],
      [10.839808123737818, 106.78023838016487],
      [10.841025190910957, 106.7807159254725],
      [10.840229619423077, 106.78040461276836],
      [10.840893473923316, 106.77961634848718],
      [10.840356068012875, 106.77890315699473],
      [10.840066289915491, 106.7787369243912],

      [10.839771242837104, 106.77896214275725],
      [10.83954995733739, 106.77925170922788],
      [10.839771242837104, 106.77896214275725],
      [10.84015058902731, 106.77923562220174],
      [10.840371874082841, 106.77946620290984],
      [10.840103170779832, 106.7796699719077],
      [10.840371874082841, 106.77946620290984],
      [10.84064057714452, 106.77929460796429],
      [10.840371874082841, 106.77946620290984],
      [10.840630039774107, 106.77992736432604]
    ];
    const duongnhanh4: Leaflet.LatLngExpression[] = [
      [10.844044128370353, 106.78252409166805],
      [10.84351199675429, 106.7823364096964],
      [10.843074699767135, 106.78203611854165],
      [10.84351199675429, 106.7823364096964],
      [10.843191103809206, 106.7840838432312],
      [10.842832836061024, 106.78396582603456],
      [10.842938208972672, 106.78338646888733],
      [10.843264864762926, 106.78351521492006],
      [10.842938208972672, 106.78338646888733],
      [10.843001432701852, 106.78281784057619],
      [10.843349162973452, 106.7830002307892],
      [10.843106805554125, 106.78286075592042],
      [10.84317002924766, 106.78262472152711],
      [10.842727463112254, 106.78236722946167],
      [10.842590478223354, 106.7829465866089],
      [10.842969820838936, 106.78309679031373],
      [10.842590478223354, 106.7829465866089],
      [10.842400806735174, 106.78360104560853],
      [10.842853910646324, 106.78377270698547]
    ];
    const duongbao: Leaflet.LatLngExpression[] = [
      [10.8439703676088, 106.78154167865125],
      [10.84333813176367, 106.78027616592776],
      [10.842506179799019, 106.77986991993959],
      [10.841968776785402, 106.78116760671539],
      [10.84188447818587, 106.78153224597473],
      [10.841852866204928, 106.78243311943892],
      [10.841241700583371, 106.78266906248906],
      [10.840367099332617, 106.78188616054994],
      [10.840651608453792, 106.78071716998332],
      [10.841220625884489, 106.77952673004847],
      [10.840651608453792, 106.78071716998332],
      [10.839239597562466, 106.78160743086637],
      [10.838870787650128, 106.78098539918872],
      [10.838638964043994, 106.77984858267439],
      [10.839703243664516, 106.77858306995087],
      [10.84013527688572, 106.7784543737417],
      [10.84103095352784, 106.77918365226036],
      [10.841220625884489, 106.77952673004847],
      [10.841905552837986, 106.77949466809916],
      [10.842506179799019, 106.77986991993959],
      [10.84333813176367, 106.78027616592776],
      [10.8439703676088, 106.78154167865125],
      [10.843391312069828, 106.78449153900148],
      [10.841937164813354, 106.78415894508363],
      [10.841852866204928, 106.78243311943892],
    ];

    // const polyline = Leaflet.polyline(latLngs, { color: 'blue' }).addTo(this.map);
    const polyline1 = Leaflet.polyline(duongnhanh1, { color: 'green' }).addTo(this.map);
    const polyline2 = Leaflet.polyline(duongnhanh2, { color: 'green' }).addTo(this.map);
    const polyline3 = Leaflet.polyline(duongnhanh3, { color: 'green' }).addTo(this.map);
    const polyline4 = Leaflet.polyline(duongnhanh4, { color: 'green' }).addTo(this.map);
    const polyline5 = Leaflet.polyline(duongchinh, { weight: 5, color: 'blue' }).addTo(this.map);
    const polyline6 = Leaflet.polyline(duongbao, { weight: 5, color: 'red' }).addTo(this.map);
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
