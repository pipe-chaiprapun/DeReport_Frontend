import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../services/appserver.service';
import constant from '../../services/color.js'
declare const $;
// declare const Chart;
declare const App;
@Component({
  selector: 'app-chart',
  templateUrl: './sale-info.component.html',
  styleUrls: ['./sale-info.component.css']
})
export class SaleInfoComponent implements OnInit {
  private labels = [];
  private targetAmt = [];
  private saleAmt = [];
  private payAmt = [];
  private pdoAmt = [];

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
  }
  private devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
  private initialLoadChart() {
    this.resAPI.getSaleInfo().subscribe(result => {
      console.log('---------- get sale info --------------------')
      console.log(result.data);
      // var labels = [];
      // var targetAmt = [];
      // var saleAmt = [];
      // var payAmt = [];
      // var pdoAmt = [];
      result.data.forEach(element => {
        this.labels.push(element.BRH_ID);
      });
      result.data.forEach(element => {
        this.targetAmt.push(element.TAR_AMT);
      })
      result.data.forEach(element => {
        this.saleAmt.push(element.SALE_AMT);
      })
      result.data.forEach(element => {
        this.payAmt.push(element.PAY_AMT);
      })
      result.data.forEach(element => {
        this.pdoAmt.push(element.PDO_AMT);
      })
      // ['#F7464A', '#46BFBD', '#FDB45C']
      const bdata = {
        labels: this.labels, //['สาขา02', 'สาขา03', 'สาขา04', 'สาขา05', 'สาขา06', 'สาขา07', 'สาขา08', 'สาขา09', 'สาขา10', 'สาขา11', 'สาขา12', 'สาขา'],
        datasets: [
          {
            label: 'ยอดเป้าหมาย',
            backgroundColor: constant.tarAmt.background,//'rgba(220,220,220,0.2)',
            borderColor: constant.tarAmt.border,
            borderWidth: 2,
            data: this.targetAmt //[65, 59, 80, 81, 56, 86, 90, 83, 89, 56, 12, 45]
          },
          {
            label: 'ยอดขาย',
            backgroundColor: constant.saleAmt.background,//'rgba(151,187,205,0.2)',
            borderColor: constant.saleAmt.border,
            borderWidth: 2,
            data: this.saleAmt //[60, 48, 85, 75, 60, 84, 56, 34, 25, 56, 76, 56]
          },
          {
            label: 'ขาดยอด/เกินยอด',
            backgroundColor: constant.payAmt.background,
            borderColor: constant.payAmt.border,
            borderWidth: 2,
            data: this.payAmt //[-10, 50, 80, 50, -20, 75, 57, 34, 25, 67, 45, 67]
          },
          {
            label: 'PDO',
            backgroundColor: constant.pdoAmt.background,
            borderColor: constant.pdoAmt.border,
            borderWidth: 2,
            data: this.pdoAmt //[-10, 50, 80, 50, -20, 75, 57, 34, 25, 67, 45, 67]
          }
        ]
      };
      const ctxb = $('#barChartDemo').get(0).getContext('2d');
      const barChart = new Chart(ctxb, {
        type: 'bar',
        data: bdata,
      });
    })
  }
}
