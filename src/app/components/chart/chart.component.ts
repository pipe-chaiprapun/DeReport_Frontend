import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../services/appserver.service';
declare const App:any;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  branchs: any = [];
  charts: any = [];
  lineChart: any = []; //ประกาศตัวแปรเก็บค่า

  labels: any = [];
  datas: any = [];

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
  }


  onSubmit(value) {


    this.resAPI.getBranch(value).subscribe(result => {
      this.branchs = JSON.parse(JSON.stringify(result).replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); }));
    })


    this.resAPI.getChart(value).subscribe(result => {
      this.charts = JSON.parse(JSON.stringify(result).replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); }));

      for (var i = 0, len = this.charts.length; i < len; i++) {
        this.labels[i] = this.charts[i]['mm'];
        this.datas[i] = this.charts[i]['sale_amt'];
      }
      this.onCreateChart();
    })



    // for (var i = 0, len = this.charts.length; i < len; i++) {
    //   console.log[" ทดสอบ : " + i];

    //   this.labels[i] = this.charts[i]['mm'];
    //   this.datas[i] = this.charts[i]['sale_amt'];

    //   //console.log(this.labels[i]);
    //   console.log(this.datas[i]);
    // }


    // var promise = new Promise((resolve, reject) => {
    //   resolve(this.charts);
    // });


    // promise.then((data: []) => {
    //   for (var i = 0, len = data.length; i < len; i++) {
    //     this.labels[i] = data[i]['mm'];
    //     this.datas[i] = this.charts[i]['sale_amt'];

    //   }
    // });









    // console.log(this.labels);
    // console.log(this.datas);


    // this.onCreateChart();
    // this.chart.lineChart(this.labels, this.datas);
  }


  onCreateChart() {
    this.lineChart = new Chart('lineChart', { // สร้าง object และใช้ชื่อ id lineChart ในการอ้างอิงเพื่อนำมาเเสดงผล
      type: 'line', // ใช้ชนิดแผนภูมิแบบเส้นสามารถเปลี่ยนชิดได้
      data: { // ข้อมูลภายในแผนภูมิแบบเส้น
        // labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"], // ชื่อของข้อมูลในแนวแกน x
        labels: this.labels,
        datasets: [{ // กำหนดค่าข้อมูลภายในแผนภูมิแบบเส้น
          label: 'Number of items sold in months',
          //data: [9, 7, 3, 5, 2, 10, 15, 61, 19, 3, 1, 9],
          data: this.datas,
          fill: false,
          lineTension: 0.2,
          borderColor: "red", // สีของเส้น
          borderWidth: 1
        }]
      },
      options: {
        title: { // ข้อความที่อยู่ด้านบนของแผนภูมิ
          text: "Line Chart",
          display: true
        }
      },
      scales: { // แสดง scales ของแผนภูมิเริมที่ 0
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    })
  }

}
