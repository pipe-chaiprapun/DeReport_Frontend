import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../services/appserver.service';
import constant from '../../services/color3.js';
import { Library } from '../../services/library';
declare const $;
declare const App;
@Component({
  selector: 'app-pay-report',
  templateUrl: './pay-report.component.html',
  styleUrls: ['./pay-report.component.css']
})
export class PayReportComponent implements OnInit {

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
  private library: Library;
  private firstDay: Date;
  private lastDay: Date;
  public startMonth: string;
  public endMonth: string;
  public title: string;
  private txtStartDate: HTMLInputElement;
  private txtEndDate: HTMLInputElement;
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
    this.initialLoadChart();
  }
  private initialLoadChart() {
    this.library = new Library();
    this.library = new Library();
    $('#payStartDate').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    });
    let self = this;
    $('#payEndDate').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    }).on('changeMonth', function(e) {
      let temp = e.date;
      temp.setMonth(temp.getMonth() - 1);
      self.txtStartDate.value = self.library.convertDateFormat(temp).substring(3, 10);
    });
    this.today = new Date(Date.now());
    this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.lastDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.firstDay.setMonth(this.firstDay.getMonth() - 1);
    this.txtStartDate = document.getElementById('payStartDate') as HTMLInputElement;
    this.txtEndDate = document.getElementById('payEndDate') as HTMLInputElement;
    this.txtStartDate.value = this.library.convertDateFormat(this.firstDay).substring(3, 10);
    this.txtEndDate.value = this.library.convertDateFormat(this.lastDay).substring(3, 10);
    this.startMonth = this.txtStartDate.value;
    this.endMonth = this.txtEndDate.value;
    // this.txtStartDate.value = this.today.getFullYear().toString();
    // this.txtEndDate.value = '%';
    this.sortOption = '%';
    const res = this.library.getPeriodMonth(this.startMonth, this.endMonth);
    // tslint:disable-next-line:max-line-length
    this.resAPI.getPayAmt(this.library.convertDateFormat2(res.firstDay), this.library.convertDateFormat2(res.lastDay), this.sortOption).subscribe(result => {
      console.log(result);
      this.title = result.title;
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
        element.data.forEach(e => devided.push(this.library.devideMillion(e)));
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
      const ctxb = $('#saleBrhChart').get(0).getContext('2d');
      this.barChart = new Chart(ctxb, {
        type: 'bar',
        data: bdata
      });
    });
  }
  public getPeriod(startDate, endDate) {
    console.log(startDate.value, endDate.value);
    let m1 = startDate.value.split('/');
    let m2 = endDate.value.split('/');
    this.lastDay.setMonth(Number(m2[0]) - 1);
    this.lastDay.setFullYear(Number(m2[1]));
    this.firstDay.setMonth(this.lastDay.getMonth() - 1);
    console.log(this.firstDay, this.lastDay);
    // this.startMonth = startDate.value;
    // this.endMonth = endDate.value;

    const result = this.library.getPeriodMonth(startDate.value, endDate.value);
    this.headers = [];
    this.allData = [];
    this.displayData = [];
    this.dataSets = [];
    this.legend = [];

    this.getData(result.firstDay, result.lastDay, this.sortOption, this.filter);
  }
  private getData(firstDay, lastDay, sort = '%', filter = []) {
    // tslint:disable-next-line:max-line-length
    this.resAPI.getPayAmt(this.library.convertDateFormat2(firstDay), this.library.convertDateFormat2(lastDay), sort, filter).subscribe(result => {
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
        element.data.forEach(e => devided.push(this.library.devideMillion(e)));
        this.dataSets.push({
          label: element.label,
          borderWidth: 1,
          data: devided,
          backgroundColor: constant.saleChart[this.displayData.indexOf(element) - 1].background,
          borderColor: constant.saleChart[this.displayData.indexOf(element) - 1].border,
          hidden: element.hidden
        });
      });
      this.masterColumn = result.masterColumn;
      result.data[0].data.forEach(element => this.legend.push(element));
      this.newRenderChart();
    });
  }
  onChange(data) {
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
  private newRenderChart() {
    this.barChart.destroy();
    const bdata = {
      labels: this.legend,
      datasets: this.dataSets
    };
    const ctxb = $('#saleBrhChart').get(0).getContext('2d');
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata
    });
  }
}
