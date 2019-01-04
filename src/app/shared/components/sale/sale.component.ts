import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../../services/appserver.service';
import constant from '../../../services/color2.js';
import { Library } from '../../../services/library';
declare const $;
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
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
  public startMonth;
  public endMonth;
  private library: Library;
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initialLoadChart();
  }
  private initialLoadChart() {
    this.library = new Library();
    $('#startDtSaleBrh').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    }).on('show', function(e) {
      $('#filter').addClass('hovered');
    }).on('hide', function(e) {
      $('#filter').removeClass('hovered');
    });
    $('#endDtSaleBrh').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    }).on('show', function(e) {
      $('#filter').addClass('hovered');
    }).on('hide', function(e) {
      $('#filter').removeClass('hovered');
    });
    this.today = new Date(Date.now());
    this.today.setMonth(this.today.getMonth() - 1);
    this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    const startDt = document.getElementById('startDtSaleBrh') as HTMLInputElement;
    const endDt = document.getElementById('endDtSaleBrh') as HTMLInputElement;
    startDt.value = this.library.convertDateFormat(this.firstDay).substring(3, 10);
    endDt.value = this.library.convertDateFormat(this.lastDay).substring(3, 10);
    this.startMonth = startDt.value;
    this.endMonth = endDt.value;
    // tslint:disable-next-line:max-line-length
    this.resAPI.getSaleInfo2(this.library.convertDateFormat(this.firstDay), this.library.convertDateFormat(this.lastDay)).subscribe(result => {
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
  public getPeriod(startDate, endDate) {
    console.log(startDate.value, endDate.value);
    this.startMonth = startDate.value;
    this.endMonth = endDate.value;
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
    this.resAPI.getSaleInfo2(this.library.convertDateFormat(firstDay), this.library.convertDateFormat(lastDay), sort, filter).subscribe(result => {
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
    const ctxb = $('#saleBrhChart').get(0).getContext('2d');
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata
    });
  }
}
