import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
// import { ChartType } from 'ng-chartist';
// import { IChartistData, ILineChartOptions } from 'chartist';

// import * as ctLegends from 'chartist-plugin-legend/chartist-plugin-legend.js';
@Component({
  selector: 'sp-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  widgetTitle: string = 'Sales Statistics'
  widgetSubTitle: string = 'Vestibulum purus quam scelerisque, mollis nonummy metus'
  pieChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [

      ['Country', 'Performance', 'Profits'],
      ['Germany', 700, 1200],
      ['USA', 300, 600],
      ['Brazil', 400, 500],
      ['Canada', 500, 1000],
      ['France', 600, 1100],
      ['RU', 800, 1000]
    ],
    
    //firstRowIsData: true,
  };
  // type: ChartType = 'Line';

  // data: IChartistData = {
  //   labels: [
  //     '10',
  //     '20',
  //     '30',
  //     '40',
  //     '50',
  //     '60',
  //     '70'
  //   ],
  //   series: [
  //     {
  //       "name": "2017",
  //       "data": [90, 40, 80, 20, 90, 20, 60]
  //     },
  //     {
  //       "name": "2018",
  //       "data": [80, 30, 70, 10, 80, 10, 50],
  //     }
  //   ]
  // };

  // options: ILineChartOptions = {
  //   height: '250px',
  //   chartPadding: {
  //     left: -12,
  //     bottom: -15
  //   },
  //   fullWidth: true,
  //   low: 0,
  //   showArea: true,
  //   showPoint: false,
  //   plugins: [
  //     ctLegends({
  //       position: 'bottom'
  //     })
  //   ]
  // };
  constructor() { }

  ngOnInit() {
  }

}
