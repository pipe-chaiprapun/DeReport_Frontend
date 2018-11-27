import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../services/appserver.service';
import constant from '../../services/color.js';
import color from '../../services/color2.js';
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
  public allData = [];
  private displayData = [];
  private current;
  private currentData;
  private barChart;
  private dataSets = [];
  private allDataSets = [];
  private headers = [];
  public sort = [];
  public test: number[][];
  private sortOption;

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
  }
  private devideMillion(data: number) {
    return Math.round((data / 1000000));
  }
  sortBy(data, select) {

    this.labels = [];
    this.targetAmt = [];
    this.saleAmt = [];
    this.payAmt = [];
    this.pdoAmt = [];
    this.diffTarAmt = [];
    if (data.target.childNodes[0].data === 'สาขา') {
      this.sortOption = 'brh';
      this.sortByBranch();
    } else if (data.target.childNodes[0].data === this.headers[0]) {
      this.sortOption = 'tar';
      this.sortByTarAmt();
    } else if (data.target.childNodes[0].data === this.headers[1]) {
      this.sortOption = 'sale';
      this.sortBySaleAmt();
    } else if (data.target.childNodes[0].data === this.headers[2]) {
      this.sortOption = 'pay';
      this.sortByPayAmt();
    } else if (data.target.childNodes[0].data === this.headers[2]) {
      this.sortOption = 'diff';
      this.sortByDiffTarAmt();
    } else if (data.target.childNodes[0].data === this.headers[3]) {
      this.sortOption = 'pdo';
      this.sortByPDO();
    } else {
      this.sortByBranch();
    }
    this.dataSets = [];
    this.dataSets = [
      {
        label: this.headers[0],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 2,
        data: this.targetAmt
      },
      {
        label: this.headers[1],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 2,
        data: this.saleAmt
      },
      {
        label: this.headers[2],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 2,
        data: this.payAmt
      },
      {
        label: this.headers[3],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 2,
        data: this.diffTarAmt
      },
      {
        label: this.headers[4],
        backgroundColor: constant.pdoAmt.background,
        borderColor: constant.pdoAmt.border,
        borderWidth: 2,
        data: this.pdoAmt
      }
    ];
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
  onChange(data, select) {
    // console.log(data);
    const branch = data.target.innerText;
    const checked = data.target.childNodes[0].checked;
    const index = this.allData.findIndex(e => e.BRH_ID === data.target.innerText);
    this.newRenderChart(branch, checked === true ? false : true, index);
  }
  onDataChange(data, select) {
    const dataOpt = data.target.innerText;
    const checked = data.target.childNodes[0].checked;
    const index = this.allDataSets.findIndex(e => e.label === data.target.innerText);
    this.newRenderBar(dataOpt, checked === true ? false : true, index);
  }
  private newRenderBar(data, display, index) {
    this.currentData = this.allDataSets[index];
    console.log('----------------- just remove ---------------');
    console.log(this.currentData);
    if (display === false) {
      this.dataSets = this.dataSets.filter(e => e.label !== this.currentData.label);
    } else {
      this.dataSets.push(this.currentData);
      // const temp = this.dataSets;
      // temp.push(this.currentData);
      // this.dataSets = [];
      // for (const e of this.allDataSets) {
      //   for (const ee of temp) {
      //     if (e.label === ee.label) {
      //       this.dataSets.push(ee);
      //     }
      //   }
      // }
    }
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
  private newRenderChart(brh, display, index) {
    this.current = this.allData[index];
    this.labels = [];
    this.targetAmt = [];
    this.saleAmt = [];
    this.payAmt = [];
    this.pdoAmt = [];
    this.diffTarAmt = [];
    if (display === false) {
      this.displayData = this.displayData.filter(e => e !== this.current);
      if (this.sortOption === 'brh') {
        this.sortByBranch();
      } else if (this.sortOption === 'tar') {
        this.sortByTarAmt();
      } else if (this.sortOption === 'sale') {
        this.sortBySaleAmt();
      } else if (this.sortOption === 'pay') {
        this.sortByPayAmt();
      } else if (this.sortOption === 'diff') {
        this.sortByDiffTarAmt();
      } else if (this.sortOption === 'pdo') {
        this.sortByPDO();
      } else {
        this.sortByBranch();
      }
    } else {
      this.displayData.push(this.current);
      if (this.sortOption === 'brh') {
        this.sortByBranch();
      } else if (this.sortOption === 'tar') {
        this.sortByTarAmt();
      } else if (this.sortOption === 'sale') {
        this.sortBySaleAmt();
      } else if (this.sortOption === 'pay') {
        this.sortByPayAmt();
      } else if (this.sortOption === 'diff') {
        this.sortByDiffTarAmt();
      } else if (this.sortOption === 'pdo') {
        this.sortByPDO();
      } else {
        this.sortByBranch();
      }
      // this.labels.push(brh);
      // this.targetAmt.push(this.devideMillion(this.current.TAR_AMT));
      // this.saleAmt.push(this.devideMillion(this.current.SALE_AMT));
      // this.payAmt.push(this.devideMillion(this.current.PAY_AMT));
      // this.pdoAmt.push(this.devideMillion(this.current.PDO_AMT));
      // this.diffTarAmt.push(this.devideMillion(this.current.DIF_TAR_AMT));
    }
    // this.sortByBranch();
    this.dataSets = [];
    this.dataSets = [
      {
        label: this.headers[0],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 2,
        data: this.targetAmt
      },
      {
        label: this.headers[1],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 2,
        data: this.saleAmt,
      },
      {
        label: this.headers[2],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 2,
        data: this.payAmt
      },
      {
        label: this.headers[3],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 2,
        data: this.diffTarAmt
      },
      {
        label: this.headers[4],
        backgroundColor: constant.pdoAmt.background,
        borderColor: constant.pdoAmt.border,
        borderWidth: 2,
        data: this.pdoAmt
      }
    ];
    const bdata = {
      labels: this.labels,
      datasets: this.dataSets
    };
    const ctxb = $('#barChartDemo').get(0).getContext('2d');
    this.barChart.destroy();
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata
    });
  }
  private sortByBranch() {
    this.displayData.forEach(e => this.labels.push(e.BRH_ID));
    this.labels.sort();
    for (const i of this.labels) {
      for (const j of this.displayData) {
        if (i === j.BRH_ID) {
          this.targetAmt.push(this.devideMillion(j.TAR_AMT));
          this.saleAmt.push(this.devideMillion(j.SALE_AMT));
          this.payAmt.push(this.devideMillion(j.PAY_AMT));
          this.pdoAmt.push(this.devideMillion(j.PDO_AMT));
          this.diffTarAmt.push(this.devideMillion(j.DIF_TAR_AMT));
        }
      }
    }
  }
  private sortByTarAmt() {
    this.displayData.forEach(e => this.targetAmt.push(this.devideMillion(e.TAR_AMT)));
    this.targetAmt.sort(function (a, b) { return a - b; });
    for (const i of this.targetAmt) {
      for (const j of this.displayData) {
        if (i === this.devideMillion(j.TAR_AMT)) {
          this.labels.push(j.BRH_ID);
          this.saleAmt.push(this.devideMillion(j.SALE_AMT));
          this.payAmt.push(this.devideMillion(j.PAY_AMT));
          this.pdoAmt.push(this.devideMillion(j.PDO_AMT));
          this.diffTarAmt.push(this.devideMillion(j.DIF_TAR_AMT));
        }
      }
    }
  }
  private sortBySaleAmt() {
    this.displayData.forEach(e => this.saleAmt.push(this.devideMillion(e.SALE_AMT)));
    this.saleAmt.sort(function (a, b) { return a - b; });
    for (const i of this.saleAmt) {
      for (const j of this.displayData) {
        if (i === this.devideMillion(j.SALE_AMT)) {
          this.labels.push(j.BRH_ID);
          this.targetAmt.push(this.devideMillion(j.TAR_AMT));
          this.payAmt.push(this.devideMillion(j.PAY_AMT));
          this.pdoAmt.push(this.devideMillion(j.PDO_AMT));
          this.diffTarAmt.push(this.devideMillion(j.DIF_TAR_AMT));
        }
      }
    }
  }
  private sortByPayAmt() {
    this.displayData.forEach(e => this.payAmt.push(this.devideMillion(e.PAY_AMT)));
    this.payAmt.sort(function (a, b) { return a - b; });
    for (const i of this.payAmt) {
      for (const j of this.displayData) {
        if (i === this.devideMillion(j.PAY_AMT)) {
          this.labels.push(j.BRH_ID);
          this.targetAmt.push(this.devideMillion(j.TAR_AMT));
          this.saleAmt.push(this.devideMillion(j.SALE_AMT));
          this.pdoAmt.push(this.devideMillion(j.PDO_AMT));
          this.diffTarAmt.push(this.devideMillion(j.DIF_TAR_AMT));
        }
      }
    }
  }
  private sortByDiffTarAmt() {
    this.displayData.forEach(e => this.diffTarAmt.push(this.devideMillion(e.DIF_TAR_AMT)));
    this.diffTarAmt.sort(function (a, b) { return a - b; });
    for (const i of this.diffTarAmt) {
      for (const j of this.displayData) {
        if (i === this.devideMillion(j.DIF_TAR_AMT)) {
          this.labels.push(j.BRH_ID);
          this.targetAmt.push(this.devideMillion(j.TAR_AMT));
          this.payAmt.push(this.devideMillion(j.PAY_AMT));
          this.pdoAmt.push(this.devideMillion(j.PDO_AMT));
          this.saleAmt.push(this.devideMillion(j.SALE_AMT));
        }
      }
    }
  }
  private sortByPDO() {
    this.displayData.forEach(e => this.pdoAmt.push(this.devideMillion(e.PDO_AMT)));
    this.pdoAmt.sort(function (a, b) { return a - b; });
    for (const i of this.pdoAmt) {
      for (const j of this.displayData) {
        if (i === this.devideMillion(j.PDO_AMT)) {
          this.labels.push(j.BRH_ID);
          this.targetAmt.push(this.devideMillion(j.TAR_AMT));
          this.payAmt.push(this.devideMillion(j.PAY_AMT));
          this.diffTarAmt.push(this.devideMillion(j.DIF_TAR_AMT));
          this.saleAmt.push(this.devideMillion(j.SALE_AMT));
        }
      }
    }
  }
  private initialLoadChart() {
    this.resAPI.getSaleInfo().subscribe(result => {
      console.log('---------- get sale info --------------------');
      console.log(result.status);
      console.log(result.data);
      this.headers = result.header;
      this.sort = result.header;
      this.sortOption = 'brh';
      this.allData = result.data;
      this.displayData = result.data;
      result.data.forEach(e => {
        this.labels.push(e.BRH_ID);
      });
      result.data.forEach(e => {
        this.targetAmt.push(this.devideMillion(e.TAR_AMT));
      });
      result.data.forEach(e => {
        this.saleAmt.push(this.devideMillion(e.SALE_AMT));
      });
      result.data.forEach(e => {
        this.payAmt.push(this.devideMillion(e.PAY_AMT));
      });
      result.data.forEach(e => {
        this.pdoAmt.push(this.devideMillion(e.PDO_AMT));
      });
      result.data.forEach(e => {
        this.diffTarAmt.push(this.devideMillion(e.DIF_TAR_AMT));
      });

      this.dataSets = [
        {
          label: this.headers[0],
          backgroundColor: constant.tarAmt.background,
          borderColor: constant.tarAmt.border,
          // backgroundColor: color.barChart[0].background,
          // borderColor: color.barChart[0].border,
          borderWidth: 1,
          data: this.targetAmt
        },
        {
          label: this.headers[1],
          backgroundColor: constant.saleAmt.background,
          borderColor: constant.saleAmt.border,
          borderWidth: 1,
          data: this.saleAmt
        },
        {
          label: this.headers[2],
          backgroundColor: constant.payAmt.background,
          borderColor: constant.payAmt.border,
          borderWidth: 1,
          data: this.payAmt
        },
        {
          label: this.headers[3],
          backgroundColor: constant.diffTarAmt.background,
          borderColor: constant.diffTarAmt.border,
          borderWidth: 1,
          data: this.diffTarAmt,
          hidden: true
        },
        {
          label: this.headers[4],
          backgroundColor: constant.pdoAmt.background,
          borderColor: constant.pdoAmt.border,
          borderWidth: 1,
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
        // animation: {
        //   animationDuration: 0,
        //   duration: 0,
        //   onComplete: function () {
        //       // render the value of the chart above the bar
        //       const ctx = this.chart.ctx;
        //       ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize,
        //         'normal', Chart.defaults.global.defaultFontFamily);
        //       ctx.fillStyle = this.chart.config.options.defaultFontColor;
        //       ctx.textAlign = 'center';
        //       ctx.textBaseline = 'bottom';
        //       this.data.datasets.forEach(function (dataset) {
        //           for (let i = 0; i < dataset.data.length; i++) {
        //               const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
        //               ctx.fillText(dataset.data[i], model.x, model.y - 5);
        //           }
        //       });
        //   }}
      });
    });
  }
}