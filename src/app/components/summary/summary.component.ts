import { Component, OnInit } from '@angular/core';
declare const $;
declare const Chart;
declare const App;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
  }
  private initialLoadChart() {
    const LineData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My First dataset',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'My Second dataset',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86]
        }
      ]
    };
    const PieData = {
      labels: ['Complete', 'In-Progress'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ['#46BFBD', '#F7464A'],
          hoverBackgroundColor: ['#5AD3D1', '#FF5A5E']
        }
      ]
    };
    // var pdata = [
    //   {
    //     value: 300,
    //     color: '#46BFBD',
    //     highlight: '#5AD3D1',
    //     label: 'Complete'
    //   },
    //   {
    //     value: 50,
    //     color: '#F7464A',
    //     highlight: '#FF5A5E',
    //     label: 'In-Progress'
    //   }
    // ]

    const ctxl = $('#lineChartDemo').get(0).getContext('2d');
    const lineChart = new Chart(ctxl, {
      type: 'line',
      data: LineData,
    });

    const ctxp = $('#pieChartDemo').get(0).getContext('2d');
    // var pieChart = new Chart(ctxp).Pie(pdata);
    const pieChart = new Chart(ctxp, {
      type: 'pie',
      data: PieData
    });
  }
}
