import { Component, ViewChild } from '@angular/core';
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
  ApexLegend
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  markers: ApexMarkers;
  grid: ApexGrid;
  legend: ApexLegend;
};

@Component({
  selector: 'app-pressure-chart',
  templateUrl: './pressure-chart.component.html',
  styleUrls: ['./pressure-chart.component.css']
})
export class PressureChartComponent {
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [
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
      chart: {
        height: 350,
        type: "line",
        fontFamily: "Roboto, sans-serif"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: "smooth"
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009]
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      title: {
        text: "Áp lực nước",
        align: "left"
      },
      yaxis: {
        title: {
          text: "Values"
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetY: -20
      }
    };
  }
}
