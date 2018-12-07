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
  private monthName = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม',
    'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

  private labels = [];
  private targetAmt = [];
  private saleAmt = [];
  private payAmt = [];
  private diffTarAmt = [];
  private pdoLg = [];
  public allData = [];
  private displayData = [];
  private current;
  private currentData;
  private barChart;
  private dataSets = [];
  private allDataSets = [];
  private headers = ['สาขา'];
  public sort = ['สาขา'];
  public test: number[][];
  private sortOption;

  public month;

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
  }
  private devideMillion(data: number) {
    // return Math.round((data / 1000000));
    return (data / 1000000).toFixed(2);
  }
  sortBy(data) {
    console.log(data);
    this.labels = [];
    this.targetAmt = [];
    this.saleAmt = [];
    this.payAmt = [];
    this.pdoLg = [];
    this.diffTarAmt = [];
    if (data === this.headers[0]) {
      this.sortOption = this.headers[0];
      this.sortByBranch();
    } else if (data === this.headers[1]) {
      this.sortOption = this.headers[1];
      this.sortByTarAmt();
    } else if (data === this.headers[2]) {
      this.sortOption = this.headers[2];
      this.sortBySaleAmt();
    } else if (data === this.headers[3]) {
      this.sortOption = this.headers[3];
      this.sortByPayAmt();
    } else if (data === this.headers[4]) {
      this.sortOption = this.headers[4];
      this.sortByDiffTarAmt();
    } else if (data === this.headers[5]) {
      this.sortOption = this.headers[5];
      this.sortByPDO();
    } else {
      this.sortByBranch();
    }
    this.dataSets = [];
    this.dataSets = [
      {
        label: this.headers[1],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 2,
        data: this.targetAmt
      },
      {
        label: this.headers[2],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 2,
        data: this.saleAmt
      },
      {
        label: this.headers[3],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 2,
        data: this.payAmt
      },
      {
        label: this.headers[4],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 2,
        data: this.diffTarAmt
      },
      {
        label: this.headers[5],
        backgroundColor: constant.pdoLg.background,
        borderColor: constant.pdoLg.border,
        borderWidth: 2,
        data: this.pdoLg
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
    this.pdoLg = [];
    this.diffTarAmt = [];
    if (display === false) {
      this.displayData = this.displayData.filter(e => e !== this.current);
      if (this.sortOption === this.headers[0]) {
        this.sortByBranch();
      } else if (this.sortOption === this.headers[1]) {
        this.sortByTarAmt();
      } else if (this.sortOption === this.headers[2]) {
        this.sortBySaleAmt();
      } else if (this.sortOption === this.headers[3]) {
        this.sortByPayAmt();
      } else if (this.sortOption === this.headers[4]) {
        this.sortByDiffTarAmt();
      } else if (this.sortOption === this.headers[5]) {
        this.sortByPDO();
      } else {
        this.sortByBranch();
      }
    } else {
      this.displayData.push(this.current);
      if (this.sortOption === this.headers[0]) {
        this.sortByBranch();
      } else if (this.sortOption === this.headers[1]) {
        this.sortByTarAmt();
      } else if (this.sortOption === this.headers[2]) {
        this.sortBySaleAmt();
      } else if (this.sortOption === this.headers[3]) {
        this.sortByPayAmt();
      } else if (this.sortOption === this.headers[4]) {
        this.sortByDiffTarAmt();
      } else if (this.sortOption === this.headers[5]) {
        this.sortByPDO();
      } else {
        this.sortByBranch();
      }
      // this.labels.push(brh);
      // this.targetAmt.push(this.devideMillion(this.current.TAR_AMT));
      // this.saleAmt.push(this.devideMillion(this.current.SALE_AMT));
      // this.payAmt.push(this.devideMillion(this.current.PAY_AMT));
      // this.pdoLg.push(this.devideMillion(this.current.PDO_LOSS_GAIN));
      // this.diffTarAmt.push(this.devideMillion(this.current.DIF_TAR_AMT));
    }
    // this.sortByBranch();
    this.dataSets = [];
    this.dataSets = [
      {
        label: this.headers[1],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 2,
        data: this.targetAmt
      },
      {
        label: this.headers[2],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 2,
        data: this.saleAmt,
      },
      {
        label: this.headers[3],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 2,
        data: this.payAmt
      },
      {
        label: this.headers[4],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 2,
        data: this.diffTarAmt
      },
      {
        label: this.headers[5],
        backgroundColor: constant.pdoLg.background,
        borderColor: constant.pdoLg.border,
        borderWidth: 2,
        data: this.pdoLg
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
          this.pdoLg.push(this.devideMillion(j.PDO_LOSS_GAIN));
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
          this.pdoLg.push(this.devideMillion(j.PDO_LOSS_GAIN));
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
          this.pdoLg.push(this.devideMillion(j.PDO_LOSS_GAIN));
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
          this.pdoLg.push(this.devideMillion(j.PDO_LOSS_GAIN));
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
          this.pdoLg.push(this.devideMillion(j.PDO_LOSS_GAIN));
          this.saleAmt.push(this.devideMillion(j.SALE_AMT));
        }
      }
    }
  }
  private sortByPDO() {
    this.displayData.forEach(e => this.pdoLg.push(this.devideMillion(e.PDO_LOSS_GAIN)));
    this.pdoLg.sort(function (a, b) { return a - b; });
    for (const i of this.pdoLg) {
      for (const j of this.displayData) {
        if (i === this.devideMillion(j.PDO_LOSS_GAIN)) {
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
    $('#startDate').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    });
    $('#endDate').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    });
    const today = new Date(Date.now());
    today.setMonth(today.getMonth() - 1);
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startDt = document.getElementById('startDate') as HTMLInputElement;
    const endDt = document.getElementById('endDate') as HTMLInputElement;
    startDt.value = this.convertDateFormat(firstDay).substring(3, 10);
    endDt.value = this.convertDateFormat(lastDay).substring(3, 10);
    this.resAPI.getSaleInfo(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay)).subscribe(result => {
      console.log('---------- get sale info --------------------');
      console.log(result.status);
      console.log(result.data);
      // this.headers = result.header;
      // this.sort = result.header;
      result.header.forEach(element => {
        this.headers.push(element);
        this.sort.push(element);
      });
      this.sortOption = this.headers[0];
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
        this.pdoLg.push(this.devideMillion(e.PDO_LOSS_GAIN));
      });
      result.data.forEach(e => {
        this.diffTarAmt.push(this.devideMillion(e.DIF_TAR_AMT));
      });

      this.dataSets = [
        {
          label: this.headers[1],
          backgroundColor: constant.tarAmt.background,
          borderColor: constant.tarAmt.border,
          // backgroundColor: color.barChart[0].background,
          // borderColor: color.barChart[0].border,
          borderWidth: 1,
          data: this.targetAmt
        },
        {
          label: this.headers[2],
          backgroundColor: constant.saleAmt.background,
          borderColor: constant.saleAmt.border,
          borderWidth: 1,
          data: this.saleAmt
        },
        {
          label: this.headers[3],
          backgroundColor: constant.payAmt.background,
          borderColor: constant.payAmt.border,
          borderWidth: 1,
          data: this.payAmt
        },
        {
          label: this.headers[4],
          backgroundColor: constant.diffTarAmt.background,
          borderColor: constant.diffTarAmt.border,
          borderWidth: 1,
          data: this.diffTarAmt,
          hidden: true
        },
        {
          label: this.headers[5],
          backgroundColor: constant.pdoLg.background,
          borderColor: constant.pdoLg.border,
          borderWidth: 1,
          data: this.pdoLg
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
  convertDateFormat(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    let strDt = dt.toString();
    let strMonth = month.toString();
    if (dt < 10) {
      strDt = '0' + dt.toString();
    }
    if (month < 10) {
      strMonth = '0' + month;
    }
    return strDt + '/' + strMonth + '/' + year;
  }
  public getData() {
  this.labels = [];
    this.allData = [];
    this.displayData = [];
    this.labels = [];
    this.targetAmt = [];
    this.saleAmt = [];
    this.payAmt = [];
    this.pdoLg = [];
    this.diffTarAmt = [];
    this.dataSets = [];
    this.sort = [];
    const startDate = document.getElementById('startDate') as HTMLInputElement;
    const endDate = document.getElementById('endDate') as HTMLInputElement;
    this.barChart.destroy();
    this.resAPI.getSaleInfo('01/' + startDate.value, '01/' + endDate.value).subscribe(result => {
      console.log('---------- get sale info --------------------');
      console.log(result.status);
      console.log(result.data);
      // this.headers = result.header;
      // this.sort = result.header;
      result.header.forEach(element => {
        this.headers.push(element);
        this.sort.push(element);
      });
      console.log(this.headers);
      this.sortOption = this.headers[0];
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
        this.pdoLg.push(this.devideMillion(e.PDO_LOSS_GAIN));
      });
      result.data.forEach(e => {
        this.diffTarAmt.push(this.devideMillion(e.DIF_TAR_AMT));
      });

      this.dataSets = [
        {
          label: this.headers[1],
          backgroundColor: constant.tarAmt.background,
          borderColor: constant.tarAmt.border,
          // backgroundColor: color.barChart[0].background,
          // borderColor: color.barChart[0].border,
          borderWidth: 1,
          data: this.targetAmt
        },
        {
          label: this.headers[2],
          backgroundColor: constant.saleAmt.background,
          borderColor: constant.saleAmt.border,
          borderWidth: 1,
          data: this.saleAmt
        },
        {
          label: this.headers[3],
          backgroundColor: constant.payAmt.background,
          borderColor: constant.payAmt.border,
          borderWidth: 1,
          data: this.payAmt
        },
        {
          label: this.headers[4],
          backgroundColor: constant.diffTarAmt.background,
          borderColor: constant.diffTarAmt.border,
          borderWidth: 1,
          data: this.diffTarAmt,
          hidden: true
        },
        {
          label: this.headers[5],
          backgroundColor: constant.pdoLg.background,
          borderColor: constant.pdoLg.border,
          borderWidth: 1,
          data: this.pdoLg
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
