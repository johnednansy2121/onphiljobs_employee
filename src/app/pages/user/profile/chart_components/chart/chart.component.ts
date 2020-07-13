import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';


@Component({
  selector: 'sp-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['', 'Hours per Day'],
      ['Views', 16],
      ['Followers', 16],
      ['Posts', 24],
      ['Projects', 18]
    ],
    //firstRowIsData: true,
    options: {
      chartArea: { left: 10, top: 0, right: 10, width: "100%", height: "100%" },
      'title': 'Tasks',
      titlePosition: 'none',
      colors: ['#32C68A', '#3A83C0', '#FFAF40', '#FF7940'],
      legend: 'none',
    },
  };

  pieColors: any;
  constructor() { }

  ngOnInit() {
    this.pieColors = this.pieChart.options;
  }

}
