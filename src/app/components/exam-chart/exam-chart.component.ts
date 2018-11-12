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
    var data = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(220,220,220,0.2)",
          borderColor: "rgba(220,220,220,1)",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(151,187,205,0.2)",
          borderColor: "rgba(151,187,205,1)",
          pointBackgroundColor: "rgba(151,187,205,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86]
        }
      ]
    };

    // Data for Bar Chart
    var bdata = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(220,220,220,0.2)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(151,187,205,0.2)",
          borderColor: "rgba(151,187,205,1)",
          borderWidth: 2,
          data: [28, 48, 40, 19, 86]
        }
      ]
    };

    // Data for Horizontal Bar Chart
    var hbdata = {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    };

    // Data for Grouped Bar Chart
    var gbdata = {
      labels: ["1900", "1950", "1999", "2050"],
      datasets: [
        {
          label: "Africa",
          backgroundColor: "#3e95cd",
          data: [133,221,783,2478]
        }, {
          label: "Europe",
          backgroundColor: "#8e5ea2",
          data: [408,547,675,734]
        }
      ]
    };

    // Data for Radar Chart
    var rdata = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(220,220,220,0.2)",
          borderColor: "rgba(220,220,220,1)",
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(151,187,205,0.2)",
          borderColor: "rgba(151,187,205,1)",
          pointBackgroundColor: "rgba(151,187,205,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(151,187,205,1)",
          borderWidth: 2,
          data: [28, 48, 40, 19, 86]
        }
      ]
    };

    // Data for Pie Chart
    var pdata = {
      labels: ["Red", "In-Green", "Yellow"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
          hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
        }
      ]
    }

    // Data for Bubble Chart
    var bbdata = {
      datasets: [
        {
          label: ["China"],
          backgroundColor: "rgba(255,221,50,0.2)",
          borderColor: "rgba(255,221,50,1)",
          data: [{
            x: 21269017,
            y: 5.245,
            r: 120
          }]
        }, {
          label: ["Denmark"],
          backgroundColor: "rgba(60,186,159,0.2)",
          borderColor: "rgba(60,186,159,1)",
          data: [{
            x: 258702,
            y: 7.526,
            r: 10
          }]
        }, {
          label: ["Germany"],
          backgroundColor: "rgba(0,0,0,0.2)",
          borderColor: "#000",
          data: [{
            x: 3979083,
            y: 6.994,
            r: 7.17
          }]
        }, {
          label: ["Japan"],
          backgroundColor: "rgba(193,46,12,0.2)",
          borderColor: "rgba(193,46,12,1)",
          data: [{
            x: 4931877,
            y: 5.921,
            r: 11.8
          }]
        }
      ]
    }

    
    var ctxl = $("#lineChartDemo").get(0).getContext("2d");
    var lineChart = new Chart(ctxl, {
      type: "line",
      data: data,
    });

    var ctxb = $("#barChartDemo").get(0).getContext("2d");
    var barChart = new Chart(ctxb, {
      type: "bar",
      data: bdata,
    });

    var ctxr = $("#radarChartDemo").get(0).getContext("2d");
    var radarChart = new Chart(ctxr, {
      type: "radar",
      data: rdata,
    });

    var ctxpo = $("#polarChartDemo").get(0).getContext("2d");
    var polarChart = new Chart(ctxpo, {
      type: "polarArea",
      data: pdata
    });

    var ctxp = $("#pieChartDemo").get(0).getContext("2d");
    var pieChart = new Chart(ctxp, {
      type: "pie",
      data: pdata
    });

    var ctxd = $("#doughnutChartDemo").get(0).getContext("2d");
    var doughnutChart = new Chart(ctxd, {
      type: "doughnut",
      data: pdata
    });

    var ctxbb = $("#bubbleChartDemo").get(0).getContext("2d");
    var bubbleChart = new Chart(ctxbb, {
      type: "bubble",
      data: bbdata,
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }, scales: {
          yAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Happiness"
            }
          }],
          xAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "GDP (PPP)"
            }
          }]
        }
      }
    });

    var ctxhb = $("#HBarChartDemo").get(0).getContext("2d");
    var HBarChart = new Chart(ctxhb, {
      type: "horizontalBar",
      data: hbdata,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });

    var ctxgb = $("#GBarChartDemo").get(0).getContext("2d");
    var GBarChart = new Chart(ctxgb, {
      type: "bar",
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
