import * as Leaflet from 'leaflet';
export interface MarkerData {
    position: { lat: number; lng: number };
    icon: Leaflet.AwesomeMarkers.Icon; // Assuming icon is a string type
    info: string;
}