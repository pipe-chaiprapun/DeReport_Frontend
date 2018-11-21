import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../services/appserver.service';
import constant from '../../services/color.js';
import { forEach } from '@angular/router/src/utils/collection';
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
  private currentData;
  private barChart;
  private dataSets = [];
  private allDataSets = [];
  private sort = ['สาขา', 'ยอดเป้าหมาย', 'ยอดขาย', 'ขาด/เกิน ยอด', 'PDO'];
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
  }
  private devideMillion(data: number) {
    return (data / 1000000);
  }
  sortBy(data, select) {
    console.log(data.target.childNodes[0].data);
    this.sortByTarAmt();
  }
  onDataChange(data, select) {
    const dataOpt = data.target.innerText;
    const checked = data.target.childNodes[0].checked;
    const index = this.allDataSets.findIndex(element => element.label === data.target.innerText);
    console.log(index);
    console.log(data.target.innerText);
    console.log(checked === true ? false : true);
    this.newRenderBar(dataOpt, checked === true ? false : true, index);
  }
  onChange(data, select) {
    // console.log(data);
    const branch = data.target.innerText;
    const checked = data.target.childNodes[0].checked;
    const index = this.allData.findIndex(element => element.BRH_ID === data.target.innerText);
    console.log(checked === true ? false : true);
    this.newRenderChart(branch, checked === true ? false : true, index);
  }
  private sortByTarAmt() {
    this.targetAmt.sort(function (a, b) { return a - b; });
    console.log(this.targetAmt);
  }
  private sortByBranch() {
    this.labels.sort();
    this.targetAmt = [];
    this.saleAmt = [];
    this.payAmt = [];
    this.pdoAmt = [];
    this.diffTarAmt = [];
    this.labels.forEach(name => {
      const current = this.allData.filter(element => element.BRH_ID === name);
      this.targetAmt.push(this.devideMillion(current[0].TAR_AMT));
      this.saleAmt.push(this.devideMillion(current[0].SALE_AMT));
      this.payAmt.push(this.devideMillion(current[0].PAY_AMT));
      this.pdoAmt.push(this.devideMillion(current[0].PDO_AMT));
      this.diffTarAmt.push(this.devideMillion(current[0].DIF_TAR_AMT));
    });
  }
  private newRenderBar(data, display, index) {
    this.currentData = this.allDataSets[index];
    console.log('------------ inside renderBar --------------');
    console.log(this.currentData);
    if (display === false) {
      this.dataSets = this.dataSets.filter(element => element.label !== this.currentData.label);
    } else {
      const temp = this.dataSets;
      temp.push(this.currentData);
      this.dataSets = [];
      for (const e of this.allDataSets) {
        for (const ee of temp) {
          if (e.label === ee.label) {
            this.dataSets.push(ee);
          }
        }
      }
      // this.dataSets.push(this.currentData);
    }
    console.log(this.dataSets);
    const bdata = {
      labels: this.labels,
      datasets: this.dataSets
    };
    const ctxb = $('#barChartDemo').get(0).getContext('2d');
    this.barChart.destroy();
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata,
    });
    console.log(this.dataSets);
  }
  private newRenderChart(brh, display, index) {
    this.current = this.allData[index];
    if (display === false) {
      this.labels = this.labels.filter(name => name !== brh);
      this.targetAmt = this.targetAmt.filter(tar => tar !== this.devideMillion(this.current.TAR_AMT));
      this.saleAmt = this.saleAmt.filter(sale => sale !== this.devideMillion(this.current.SALE_AMT));
      this.payAmt = this.payAmt.filter(pay => pay !== this.devideMillion(this.current.PAY_AMT));
      this.pdoAmt = this.pdoAmt.filter(pdo => pdo !== this.devideMillion(this.current.PDO_AMT));
      this.diffTarAmt = this.diffTarAmt.filter(diff => diff !== this.devideMillion(this.current.DIF_TAR_AMT));
    } else {
      this.labels.push(brh);
      this.targetAmt.push(this.devideMillion(this.current.TAR_AMT));
      this.saleAmt.push(this.devideMillion(this.current.SALE_AMT));
      this.payAmt.push(this.devideMillion(this.current.PAY_AMT));
      this.pdoAmt.push(this.devideMillion(this.current.PDO_AMT));
      this.diffTarAmt.push(this.devideMillion(this.current.DIF_TAR_AMT));
    }
    this.sortByBranch();
    // this.dataSets = [
    //   {
    //     label: 'ยอดเป้าหมาย',
    //     backgroundColor: constant.tarAmt.background,
    //     borderColor: constant.tarAmt.border,
    //     borderWidth: 2,
    //     data: this.targetAmt
    //   },
    //   {
    //     label: 'ยอดขาย',
    //     backgroundColor: constant.saleAmt.background,
    //     borderColor: constant.saleAmt.border,
    //     borderWidth: 2,
    //     data: this.saleAmt
    //   },
    //   {
    //     label: 'ขาด/เกิน ยอด',
    //     backgroundColor: constant.payAmt.background,
    //     borderColor: constant.payAmt.border,
    //     borderWidth: 2,
    //     data: this.diffTarAmt
    //   },
    //   {
    //     label: 'PDO',
    //     backgroundColor: constant.pdoAmt.background,
    //     borderColor: constant.pdoAmt.border,
    //     borderWidth: 2,
    //     data: this.pdoAmt
    //   }
    // ];
    const bdata = {
      labels: this.labels,
      datasets: this.dataSets
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
      console.log('---------- get sale info --------------------');
      console.log(result.data);
      this.allData = result.data;
      result.data.forEach(element => {
        this.labels.push(element.BRH_ID);
      });
      result.data.forEach(element => {
        this.targetAmt.push(this.devideMillion(element.TAR_AMT));
      });
      result.data.forEach(element => {
        this.saleAmt.push(this.devideMillion(element.SALE_AMT));
      });
      result.data.forEach(element => {
        this.payAmt.push(this.devideMillion(element.PAY_AMT));
      });
      result.data.forEach(element => {
        this.pdoAmt.push(this.devideMillion(element.PDO_AMT));
      });
      result.data.forEach(element => {
        this.diffTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
      });
      this.dataSets = [
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
      ];
      this.allDataSets = this.dataSets;
      const bdata = {
        // tslint:disable-next-line:max-line-length
        labels: this.labels, // ['สาขา02', 'สาขา03', 'สาขา04', 'สาขา05', 'สาขา06', 'สาขา07', 'สาขา08', 'สาขา09', 'สาขา10', 'สาขา11', 'สาขา12', 'สาขา'],
        datasets: this.dataSets
      };
      const ctxb = $('#barChartDemo').get(0).getContext('2d');
      this.barChart = new Chart(ctxb, {
        type: 'bar',
        data: bdata
      });
    });
  }
}
