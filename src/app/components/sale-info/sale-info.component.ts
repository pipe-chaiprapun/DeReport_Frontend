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
  private diffTarAmt = [];
  private pdoAmt = [];
  private allData = [];
  private current;
  private barChart;
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
  }
  private devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
  onChange(data, select) {
    //console.log(data);
    let branch = data.target.innerText;
    let checked = data.target.childNodes[0].checked;
    let index = this.allData.findIndex(element => element.BRH_ID == data.target.innerText)
    console.log(checked);
    this.newRenderChart(branch, checked, index);
  }
  private newRenderChart(brh, display, index) {
    this.current = this.allData[index];
    if(display == false){
      this.labels = this.labels.filter(name => name != brh);
      this.targetAmt = this.targetAmt.filter(tar => tar != this.current.TAR_AMT);
      this.saleAmt = this.saleAmt.filter(sale => sale != this.current.SALE_AMT);
      this.payAmt = this.payAmt.filter(pay => pay != this.current.PAY_AMT);
      this.pdoAmt = this.pdoAmt.filter(pdo => pdo != this.current.PDO_AMT);
      this.diffTarAmt = this.diffTarAmt.filter(diff => diff != this.current.DIF_TAR_AMT);
    }
    const bdata = {
      labels: this.labels,
      datasets: [
        {
          label: 'ยอดเป้าหมาย',
          backgroundColor: constant.tarAmt.background,
          borderColor: constant.tarAmt.border,
          borderWidth: 2,
          data: this.targetAmt 
        },
        {
          label: 'ยอดขาย',
          backgroundColor: constant.saleAmt.background,
          borderColor: constant.saleAmt.border,
          borderWidth: 2,
          data: this.saleAmt 
        },
        {
          label: 'ขาด/เกิน ยอด',
          backgroundColor: constant.payAmt.background,
          borderColor: constant.payAmt.border,
          borderWidth: 2,
          data: this.diffTarAmt 
        },
        {
          label: 'PDO',
          backgroundColor: constant.pdoAmt.background,
          borderColor: constant.pdoAmt.border,
          borderWidth: 2,
          data: this.pdoAmt 
        }
      ]
    };
    const ctxb = $('#barChartDemo').get(0).getContext('2d');
    this.barChart.destroy();
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata,
    });
  }
  private initialLoadChart() {
    this.resAPI.getSaleInfo().subscribe(result => {
      console.log('---------- get sale info --------------------')
      console.log(result.data);
      this.allData = result.data;
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
      result.data.forEach(element => {
        this.diffTarAmt.push(element.DIF_TAR_AMT);
      });

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
            label: 'ขาด/เกิน ยอด',
            backgroundColor: constant.payAmt.background,
            borderColor: constant.payAmt.border,
            borderWidth: 2,
            data: this.diffTarAmt //[-10, 50, 80, 50, -20, 75, 57, 34, 25, 67, 45, 67]
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
      this.barChart = new Chart(ctxb, {
        type: 'bar',
        data: bdata,
      });
      let b = document.getElementById("selectBranch");
      console.log(b);
    })
  }
}
