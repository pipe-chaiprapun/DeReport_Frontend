import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../../services/appserver.service';
import constant from '../../../services/color2.js';
import { forEach } from '@angular/router/src/utils/collection';
declare const $;
declare const App;
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  private monthName = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม',
    'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  public headers = [];
  public allData = [];
  public displayData = [];
  public masterColumn = [];
  private sortOption: string;
  private filter = [];
  private dataSets = [];
  public legend = [];
  private barChart;
  public today: Date;
  private firstDay: Date;
  private lastDay: Date;

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initialLoadChart();
    App.initLoadJquery();
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
    this.today = new Date(Date.now());
    this.today.setMonth(this.today.getMonth() - 1);
    this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    const startDt = document.getElementById('startDate') as HTMLInputElement;
    const endDt = document.getElementById('endDate') as HTMLInputElement;
    startDt.value = this.convertDateFormat(this.firstDay).substring(3, 10);
    endDt.value = this.convertDateFormat(this.lastDay).substring(3, 10);
    this.resAPI.getSaleInfo2(this.convertDateFormat(this.firstDay), this.convertDateFormat(this.lastDay)).subscribe(result => {
      console.log(result);
      result.data.forEach(element => this.headers.push(element.columnName));
      result.data.forEach(element => {
        this.allData.push({
          label: element.columnName,
          data: element.data,
          hidden: element.hidden
        });
      });
      this.displayData = this.allData;
      this.sortOption = this.headers[0];
      this.displayData.slice(1, this.displayData.length).forEach(element => {
        const devided = [];
        element.data.forEach(e => devided.push(this.devideMillion(e)));
        this.dataSets.push({
          label: element.label,
          borderWidth: 1,
          data: devided,
          backgroundColor: constant.saleChart[this.displayData.indexOf(element) - 1].background,
          borderColor: constant.saleChart[this.displayData.indexOf(element) - 1].border,
          hidden: element.hidden
        });
      });
      console.log(this.displayData);
      result.data[0].data.forEach(element => this.legend.push(element));
      this.masterColumn = result.masterColumn;
      const bdata = {
        labels: this.legend,
        datasets: this.dataSets
      };
      const ctxb = $('#barChartDemo').get(0).getContext('2d');
      this.barChart = new Chart(ctxb, {
        type: 'bar',
        data: bdata
      });
    });
  }
  private convertDateFormat(data) {
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
  onChange(data, select) {
    this.headers = [];
    this.allData = [];
    this.displayData = [];
    this.dataSets = [];
    this.legend = [];
    let checked = data.target.childNodes[0].checked;
    checked = checked === true ? false : true;
    if (checked === false) {
      this.filter.push(data.target.innerText);
      console.log(this.filter);
    } else {
      this.filter = this.filter.filter(element => element !== data.target.innerText);
    }
    this.getData(this.firstDay, this.lastDay, this.sortOption, this.filter);
  }
  public sort(data) {
    this.sortOption = data;
    this.headers = [];
    this.allData = [];
    this.displayData = [];
    this.dataSets = [];
    this.legend = [];
    this.getData(this.firstDay, this.lastDay, this.sortOption, this.filter);
  }
  private getData(firstDay, lastDay, sort = '%', filter = []) {
    // tslint:disable-next-line:max-line-length
    this.resAPI.getSaleInfo2(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay), sort, filter).subscribe(result => {
      console.log(result);
      result.data.forEach(element => this.headers.push(element.columnName));
      result.data.forEach(element => {
        this.allData.push({
          label: element.columnName,
          data: element.data,
          hidden: element.hidden
        });
      });
      this.displayData = this.allData;
      this.displayData.slice(1, this.displayData.length).forEach(element => {
        const devided = [];
        element.data.forEach(e => devided.push(this.devideMillion(e)));
        this.dataSets.push({
          label: element.label,
          borderWidth: 1,
          data: devided,
          backgroundColor: constant.saleChart[this.displayData.indexOf(element) - 1].background,
          borderColor: constant.saleChart[this.displayData.indexOf(element) - 1].border,
          hidden: element.hidden
        });
      });
      console.log(this.displayData);
      result.data[0].data.forEach(element => this.legend.push(element));
      this.newRenderChart();
    });
  }
  private newRenderChart() {
    this.barChart.destroy();
    const bdata = {
      labels: this.legend,
      datasets: this.dataSets
    };
    const ctxb = $('#barChartDemo').get(0).getContext('2d');
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata
    });
  }
  private devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
}
