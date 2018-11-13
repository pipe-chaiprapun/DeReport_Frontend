import { Component, OnInit } from '@angular/core';
import { GenericBrowserDomAdapter } from '@angular/platform-browser/src/browser/generic_browser_adapter';
declare const $;
declare const Chart;
declare const App;
@Component({
  selector: 'app-exam-chart',
  templateUrl: './exam-chart.component.html',
  styleUrls: ['./exam-chart.component.css']
})
export class ExamChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
  }
  private initialLoadChart() {

    // Data for Line Chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(220,220,220,0.2)',
          borderColor: 'rgba(220,220,220,1)',
          pointBackgroundColor: 'rgba(220,220,220,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(151,187,205,0.2)',
          borderColor: 'rgba(151,187,205,1)',
          pointBackgroundColor: 'rgba(151,187,205,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(151,187,205,1)',
          data: [28, 48, 40, 19, 86]
        }
      ]
    };

    // Data for Bar Chart
    const bdata = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(220,220,220,0.2)',
          borderColor: 'rgba(220,220,220,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(151,187,205,0.2)',
          borderColor: 'rgba(151,187,205,1)',
          borderWidth: 2,
          data: [28, 48, 40, 19, 86]
        }
      ]
    };

    // Data for Horizontal Bar Chart
    const hbdata = {
      labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
      datasets: [
        {
          label: 'Population (millions)',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [2478, 5267, 734, 784, 433]
        }
      ]
    };

    // Data for Grouped Bar Chart
    const gbdata = {
      labels: ['1900', '1950', '1999', '2050'],
      datasets: [
        {
          label: 'Africa',
          backgroundColor: '#3e95cd',
          data: [133, 221, 783, 2478]
        }, {
          label: 'Europe',
          backgroundColor: '#8e5ea2',
          data: [408, 547, 675, 734]
        }
      ]
    };

    // Data for Radar Chart
    const rdata = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(220,220,220,0.2)',
          borderColor: 'rgba(220,220,220,1)',
          pointBackgroundColor: 'rgba(220,220,220,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(151,187,205,0.2)',
          borderColor: 'rgba(151,187,205,1)',
          pointBackgroundColor: 'rgba(151,187,205,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(151,187,205,1)',
          borderWidth: 2,
          data: [28, 48, 40, 19, 86]
        }
      ]
    };

    // Data for Pie Chart
    const pdata = {
      labels: ['Red', 'In-Green', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
          hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870']
        }
      ]
    };

    // Data for Bubble Chart
    const bbdata = {
      datasets: [
        {
          label: ['China'],
          backgroundColor: 'rgba(255,221,50,0.2)',
          borderColor: 'rgba(255,221,50,1)',
          data: [{
            x: 21269017,
            y: 5.245,
            r: 120
          }]
        }, {
          label: ['Denmark'],
          backgroundColor: 'rgba(60,186,159,0.2)',
          borderColor: 'rgba(60,186,159,1)',
          data: [{
            x: 258702,
            y: 7.526,
            r: 10
          }]
        }, {
          label: ['Germany'],
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderColor: '#000',
          data: [{
            x: 3979083,
            y: 6.994,
            r: 7.17
          }]
        }, {
          label: ['Japan'],
          backgroundColor: 'rgba(193,46,12,0.2)',
          borderColor: 'rgba(193,46,12,1)',
          data: [{
            x: 4931877,
            y: 5.921,
            r: 11.8
          }]
        }
      ]
    };

    const ctxl = $('#lineChartDemo').get(0).getContext('2d');
    const lineChart = new Chart(ctxl, {
      type: 'line',
      data: data,
    });

    const ctxb = $('#barChartDemo').get(0).getContext('2d');
    const barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata,
    });

    const ctxr = $('#radarChartDemo').get(0).getContext('2d');
    const radarChart = new Chart(ctxr, {
      type: 'radar',
      data: rdata,
    });

    const ctxpo = $('#polarChartDemo').get(0).getContext('2d');
    const polarChart = new Chart(ctxpo, {
      type: 'polarArea',
      data: pdata
    });

    const ctxp = $('#pieChartDemo').get(0).getContext('2d');
    const pieChart = new Chart(ctxp, {
      type: 'pie',
      data: pdata
    });

    const ctxd = $('#doughnutChartDemo').get(0).getContext('2d');
    const doughnutChart = new Chart(ctxd, {
      type: 'doughnut',
      data: pdata
    });

    const ctxbb = $('#bubbleChartDemo').get(0).getContext('2d');
    const bubbleChart = new Chart(ctxbb, {
      type: 'bubble',
      data: bbdata,
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }, scales: {
          yAxes: [ {
            scaleLabel: {
              display: true,
              labelString: 'Happiness'
            }
          }],
          xAxes: [ {
            scaleLabel: {
              display: true,
              labelString: 'GDP (PPP)'
            }
          }]
        }
      }
    });

    const ctxhb = $('#HBarChartDemo').get(0).getContext('2d');
    const HBarChart = new Chart(ctxhb, {
      type: 'horizontalBar',
      data: hbdata,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });

    const ctxgb = $('#GBarChartDemo').get(0).getContext('2d');
    const GBarChart = new Chart(ctxgb, {
      type: 'bar',
      data: gbdata,
      options: {
        title: {
          display: true,
          text: 'Population growth (millions)'
        }
      }
    });
  }
}
