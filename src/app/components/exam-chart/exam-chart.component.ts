import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
// declare const Chart;
declare const App;

@Component({
  selector: 'app-exam-chart',
  templateUrl: './exam-chart.component.html',
  styleUrls: ['./exam-chart.component.css']
})
export class ExamChartComponent implements OnInit {
  public tarAmt: string;
  public saleAmt: string;
  public diffTarAmt: string;
  public payAmt: string;
  public accTarAmt: string;
  public accSaleAmt: string;
  public losPdoAmt: string;
  public pdoAmt: string;
  public summary: string;
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
    // this.initialLoadChart();
  }

  private devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
  // private initialLoadChart() {
  //   this.resAPI.getMonthlyMeeting().subscribe(result => {
  //     this.tarAmt = this.devideMillion(result.data[0].TAR_AMT);
  //     this.saleAmt = this.devideMillion(result.data[0].SALE_AMT);
  //    // this.diffTarAmt = devideMillion(result.data[0].DIF_TAR_AMT);
  //     this.diffTarAmt = this.devideMillion(result.data[0].SALE_AMT - result.data[0].TAR_AMT);
  //     this.payAmt = this.devideMillion(result.data[0].PAY_AMT);
  //     this.accTarAmt = this.devideMillion(result.data[0].ACC_TAR_AMT);
  //     this.accSaleAmt = this.devideMillion(result.data[0].ACC_SALE_AMT);
  //     this.summary = this.devideMillion(result.data[0].ACC_TAR_AMT - result.data[0].ACC_SALE_AMT);
  //     this.losPdoAmt = this.devideMillion(result.data[0].LOS_PDO_AMT);
  //     this.pdoAmt = this.devideMillion(result.data[0].PDO_AMT);
  //   });

  //   this.resAPI.getSaleInfo().subscribe(result => {
  //     const labels = [];
  //     const targetAmt = [];
  //     const saleAmt = [];
  //     const payAmt = [];
  //     const pdoAmt = [];
  //     result.data.forEach(element => {
  //       labels.push(element.BRH_ID);
  //     });
  //     result.data.forEach(element => {
  //       targetAmt.push(element.TAR_AMT);
  //     });
  //     result.data.forEach(element => {
  //       saleAmt.push(element.SALE_AMT);
  //     });
  //     result.data.forEach(element => {
  //       payAmt.push(element.PAY_AMT);
  //     });
  //     result.data.forEach(element => {
  //       pdoAmt.push(element.PDO_AMT);
  //     });
  //     // ['#F7464A', '#46BFBD', '#FDB45C']
  //     const bdata = {
  //       labels: labels, // ['สาขา02', 'สาขา03', 'สาขา04', 'สาขา05', 'สาขา06',
  //       // 'สาขา07', 'สาขา08', 'สาขา09', 'สาขา10', 'สาขา11', 'สาขา12', 'สาขา'],
  //       datasets: [
  //         {
  //           label: 'ยอดเป้าหมาย',
  //           backgroundColor: constant.tarAmt.background, // 'rgba(220,220,220,0.2)',
  //           borderColor: constant.tarAmt.border,
  //           borderWidth: 2,
  //           data: targetAmt // [65, 59, 80, 81, 56, 86, 90, 83, 89, 56, 12, 45]
  //         },
  //         {
  //           label: 'ยอดขาย',
  //           backgroundColor: constant.saleAmt.background, // 'rgba(151,187,205,0.2)',
  //           borderColor: constant.saleAmt.border,
  //           borderWidth: 2,
  //           data: saleAmt // [60, 48, 85, 75, 60, 84, 56, 34, 25, 56, 76, 56]
  //         },
  //         {
  //           label: 'ขาดยอด/เกินยอด',
  //           backgroundColor: constant.payAmt.background,
  //           borderColor: constant.payAmt.border,
  //           borderWidth: 2,
  //           data: payAmt // [-10, 50, 80, 50, -20, 75, 57, 34, 25, 67, 45, 67]
  //         },
  //         {
  //           label: 'PDO',
  //           backgroundColor: constant.pdoAmt.background,
  //           borderColor: constant.pdoAmt.border,
  //           borderWidth: 2,
  //           data: pdoAmt // [-10, 50, 80, 50, -20, 75, 57, 34, 25, 67, 45, 67]
  //         }
  //       ]
  //     };
  //     const ctxb = $('#barChartDemo').get(0).getContext('2d');
  //     const barChart = new Chart(ctxb, {
  //       type: 'bar',
  //       data: bdata,
  //     });
  //   });
  //   // Data for Line Chart
  //   const data = {
  //     labels: ['January', 'February', 'March', 'April', 'May'],
  //     datasets: [
  //       {
  //         label: 'My First dataset',
  //         backgroundColor: 'rgba(220,220,220,0.2)',
  //         borderColor: 'rgba(220,220,220,1)',
  //         pointBackgroundColor: 'rgba(220,220,220,1)',
  //         pointBorderColor: '#fff',
  //         pointHoverBackgroundColor: '#fff',
  //         pointHoverBorderColor: 'rgba(220,220,220,1)',
  //         data: [65, 59, 80, 81, 56]
  //       },
  //       {
  //         label: 'My Second dataset',
  //         backgroundColor: 'rgba(151,187,205,0.2)',
  //         borderColor: 'rgba(151,187,205,1)',
  //         pointBackgroundColor: 'rgba(151,187,205,1)',
  //         pointBorderColor: '#fff',
  //         pointHoverBackgroundColor: '#fff',
  //         pointHoverBorderColor: 'rgba(151,187,205,1)',
  //         data: [28, 48, 40, 19, 86]
  //       }
  //     ]
  //   };

    // Data for Bar Chart
    // const bdata = {
    //   labels: ['สาขา02', 'สาขา03', 'สาขา04', 'สาขา05', 'สาขา06', 'สาขา07', 'สาขา08', 'สาขา09', 'สาขา10','สาขา11','สาขา12','สาขา'],
    //   datasets: [
    //     {
    //       label: 'ยอดเป้าหมาย',
    //       backgroundColor: 'rgba(220,220,220,0.2)',
    //       borderColor: 'rgba(220,220,220,1)',
    //       borderWidth: 2,
    //       data: [65, 59, 80, 81, 56,86,90,83,89,56,12,45]
    //     },
    //     {
    //       label: 'ยอดขาย',
    //       backgroundColor: 'rgba(151,187,205,0.2)',
    //       borderColor: 'rgba(151,187,205,1)',
    //       borderWidth: 2,
    //       data: [60, 48, 85, 75, 60,84,56,34,25,56,76,56]
    //     },{
    //       label: 'ขาดยอด/เกินยอด',
    //       backgroundColor: '#8e5ea2',
    //       borderColor: 'rgba(151,187,205,1)',
    //       borderWidth: 2,
    //       data: [-10, 50, 80, 50, -20,75,57,34,25,67,45,67]
    //     }
    //   ]
    // };

    // Data for Horizontal Bar Chart
//     const hbdata = {
//       labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
//       datasets: [
//         {
//           label: 'Population (millions)',
//           backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
//           data: [2478, 5267, 734, 784, 433]
//         }
//       ]
//     };

//     // Data for Grouped Bar Chart
//     const gbdata = {
//       labels: ['1900', '1950', '1999', '2050'],
//       datasets: [
//         {
//           label: 'Africa',
//           backgroundColor: '#3e95cd',
//           data: [133, 221, 783, 2478]
//         }, {
//           label: 'Europe',
//           backgroundColor: '#8e5ea2',
//           data: [408, 547, 675, 734]
//         }
//       ]
//     };

//     // Data for Radar Chart
//     const rdata = {
//       labels: ['January', 'February', 'March', 'April', 'May'],
//       datasets: [
//         {
//           label: 'My First dataset',
//           backgroundColor: 'rgba(220,220,220,0.2)',
//           borderColor: 'rgba(220,220,220,1)',
//           pointBackgroundColor: 'rgba(220,220,220,1)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgba(220,220,220,1)',
//           borderWidth: 2,
//           data: [65, 59, 80, 81, 56]
//         },
//         {
//           label: 'My Second dataset',
//           backgroundColor: 'rgba(151,187,205,0.2)',
//           borderColor: 'rgba(151,187,205,1)',
//           pointBackgroundColor: 'rgba(151,187,205,1)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgba(151,187,205,1)',
//           borderWidth: 2,
//           data: [28, 48, 40, 19, 86]
//         }
//       ]
//     };

//     // Data for Pie Chart
//     const pdata = {
//       labels: ['Red', 'In-Green', 'Yellow'],
//       datasets: [
//         {
//           data: [300, 50, 100],
//           backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
//           hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870']
//         }
//       ]
//     };

//     // Data for Bubble Chart
//     const bbdata = {
//       datasets: [
//         {
//           label: ['China'],
//           backgroundColor: 'rgba(255,221,50,0.2)',
//           borderColor: 'rgba(255,221,50,1)',
//           data: [{
//             x: 21269017,
//             y: 5.245,
//             r: 120
//           }]
//         }, {
//           label: ['Denmark'],
//           backgroundColor: 'rgba(60,186,159,0.2)',
//           borderColor: 'rgba(60,186,159,1)',
//           data: [{
//             x: 258702,
//             y: 7.526,
//             r: 10
//           }]
//         }, {
//           label: ['Germany'],
//           backgroundColor: 'rgba(0,0,0,0.2)',
//           borderColor: '#000',
//           data: [{
//             x: 3979083,
//             y: 6.994,
//             r: 7.17
//           }]
//         }, {
//           label: ['Japan'],
//           backgroundColor: 'rgba(193,46,12,0.2)',
//           borderColor: 'rgba(193,46,12,1)',
//           data: [{
//             x: 4931877,
//             y: 5.921,
//             r: 11.8
//           }]
//         }
//       ]
//     };

//     const ctxl = $('#lineChartDemo').get(0).getContext('2d');
//     const lineChart = new Chart(ctxl, {
//       type: 'line',
//       data: data,
//     });

//     // const ctxb = $('#barChartDemo').get(0).getContext('2d');
//     // const barChart = new Chart(ctxb, {
//     //   type: 'bar',
//     //   data: bdata,
//     // });

//     const ctxr = $('#radarChartDemo').get(0).getContext('2d');
//     const radarChart = new Chart(ctxr, {
//       type: 'radar',
//       data: rdata,
//     });

//     const ctxpo = $('#polarChartDemo').get(0).getContext('2d');
//     const polarChart = new Chart(ctxpo, {
//       type: 'polarArea',
//       data: pdata
//     });

//     const ctxp = $('#pieChartDemo').get(0).getContext('2d');
//     const pieChart = new Chart(ctxp, {
//       type: 'pie',
//       data: pdata
//     });

//     const ctxd = $('#doughnutChartDemo').get(0).getContext('2d');
//     const doughnutChart = new Chart(ctxd, {
//       type: 'doughnut',
//       data: pdata
//     });

//     const ctxbb = $('#bubbleChartDemo').get(0).getContext('2d');
//     const bubbleChart = new Chart(ctxbb, {
//       type: 'bubble',
//       data: bbdata,
//       options: {
//         title: {
//           display: true,
//           text: 'Predicted world population (millions) in 2050'
//         }, scales: {
//           yAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: 'Happiness'
//             }
//           }],
//           xAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: 'GDP (PPP)'
//             }
//           }]
//         }
//       }
//     });

//     const ctxhb = $('#HBarChartDemo').get(0).getContext('2d');
//     const HBarChart = new Chart(ctxhb, {
//       type: 'horizontalBar',
//       data: hbdata,
//       options: {
//         legend: { display: false },
//         title: {
//           display: true,
//           text: 'Predicted world population (millions) in 2050'
//         }
//       }
//     });

//     const ctxgb = $('#GBarChartDemo').get(0).getContext('2d');
//     const GBarChart = new Chart(ctxgb, {
//       type: 'bar',
//       data: gbdata,
//       options: {
//         title: {
//           display: true,
//           text: 'Population growth (millions)'
//         }
//       }
//     });
//   }
// }
}
