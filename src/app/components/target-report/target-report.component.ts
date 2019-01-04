import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AppserverService } from '../../services/appserver.service';
import constant from '../../services/color3.js';
import { Library } from '../../services/library';
declare const $;
declare const App;
@Component({
  selector: 'app-target-report',
  templateUrl: './target-report.component.html',
  styleUrls: ['./target-report.component.css']
})
export class TargetReportComponent implements OnInit {
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
  public txtYear: HTMLInputElement;
  public txtBranch: HTMLInputElement;
  private year: string;
  private branch: string;
  public title: string;
  constructor(private resAPI: AppserverService) { }
  ngOnInit() {
    App.initLoadJquery();
    this.initialLoadChart();
  }
  private initialLoadChart() {
    this.library = new Library();
    this.today = new Date(Date.now());
    this.year = this.today.getFullYear().toString();
    this.txtYear = document.getElementById('year') as HTMLInputElement;
    this.txtBranch = document.getElementById('branch') as HTMLInputElement;
    this.txtYear.value = this.today.getFullYear().toString();
    this.txtBranch.value = '%';
    this.sortOption = '%';
    this.branch = '%';
    // tslint:disable-next-line:max-line-length
    this.resAPI.getTarAmt(this.today.getFullYear(), this.sortOption, this.branch).subscribe(result => {
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
  public getPeriod(year, branch) {
    console.log(year.value, branch.value);
    this.year = year.value;
    this.branch = branch.value;
    this.headers = [];
    this.allData = [];
    this.displayData = [];
    this.dataSets = [];
    this.legend = [];
    this.getData(this.year, this.sortOption, this.branch, this.filter);
  }
  private getData(year, sort = '%', branch = '%', filter = []) {
    // tslint:disable-next-line:max-line-length
    this.resAPI.getTarAmt(year, sort, branch, filter).subscribe(result => {
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
      this.masterColumn = result.masterColumn;
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
  public sort(data) {
    this.sortOption = data;
    this.headers = [];
    this.allData = [];
    this.displayData = [];
    this.dataSets = [];
    this.legend = [];
    this.getData(this.year, this.sortOption, this.branch, this.filter);
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
    this.getData(this.year, this.sortOption, this.branch, this.filter);
  }
  inputYear(year) {
    this.year = year.value;
    this.headers = [];
    this.allData = [];
    this.displayData = [];
    this.dataSets = [];
    this.legend = [];
    this.getData(this.year, this.sortOption, this.branch, this.filter);
  }
  inputBranch(branch) {
    this.branch = branch.value;
    this.headers = [];
    this.allData = [];
    this.displayData = [];
    this.dataSets = [];
    this.legend = [];
    this.getData(this.year, this.sortOption, this.branch, this.filter);
  }
}
