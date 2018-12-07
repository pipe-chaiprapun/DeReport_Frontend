import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { noUndefined } from '@angular/compiler/src/util';
import constant from '../../services/color.js';
import { Chart } from 'chart.js';
declare const App;
declare const $;
const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษพาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];
@Component({
  selector: 'app-monthly-meeting',
  templateUrl: './monthly-meeting.component.html',
  styleUrls: ['./monthly-meeting.component.css']
})
export class MonthlyMeetingComponent implements OnInit {
  public tarAmt: string;
  public saleAmt: string;
  private diffTarAmt: string;
  public payAmt: string;
  public accTarAmt: string;
  public accSaleAmt: string;
  public losPdoAmt: string;
  public pdoAmt: string;
  private summary: string;
  public mgrsName: string;
  public numDiffTarAmt: number;
  public numSummary: number;
  public oCustPDOAMT: string;
  public nCustPDOAMT: string;
  public pdoAmtPercent: string;
  public branches = [];
  private branchInput: HTMLInputElement;
  public branchIndex = 0;
  private branchNum: number;
  public currentBranch: string;

  public paths = [];
  public pathNo = [];
  private pathName = [];
  private pathLabels = [];
  private pathTarAmt = [];
  private pathSaleAmt = [];
  private pathPayAmt = [];
  private pathDifTarAmt = [];
  private pathPdoLg = [];
  private dataSet = [];
  private barChart;
  private header = [];
  public sort = [];
  private sortOption = null;
  public allData = [];
  public displayData = [];
  private currentPath;

  public month: string;
  public year;
  public monthIndex;
  public today = new Date(Date.now());
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
    this.initLoadUI();
    // this.month = monthNames[this.today.getMonth() - 1];
    // this.year = this.today.getFullYear() + 543;
  }

  private initLoadUI() {
    const self = this;
    $('#txtMonth').datepicker({
      format: 'mm-yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    }).on('changeMonth', function (e) {
      console.log(e.date.getMonth());
      self.month = monthNames[e.date.getMonth()];
      self.monthIndex = e.date.getMonth();
      self.year = e.date.getFullYear() + 543;
      self.today.setMonth(e.date.getMonth());
      self.today.setFullYear(e.date.getFullYear());
      console.log(self.month);
      console.log(self.monthIndex);
      console.log(self.year);
      console.log(self.today);
      self.getData();
    });
    this.today.setMonth(this.today.getMonth() - 1);
    const firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    const lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    const txtMonth = document.getElementById('txtMonth') as HTMLInputElement;
    txtMonth.value = this.convertDateFormat(firstDay).substring(3, 10);
    this.monthIndex = this.today.getMonth();
    this.month = monthNames[this.today.getMonth()];
    this.year = this.today.getFullYear() + 543;
    // const startDt = document.getElementById('startDate') as HTMLInputElement;
    // const endDt = document.getElementById('endDate') as HTMLInputElement;
    // startDt.value = this.convertDateFormat(firstDay);
    // endDt.value = this.convertDateFormat(lastDay);
    // $('#startDate').datepicker({
    //   format: 'dd/mm/yyyy',
    //   autoclose: true,
    //   todayHighlight: true
    // });
    // $('#endDate').datepicker({
    //   format: 'dd/mm/yyyy',
    //   autoclose: true,
    //   todayHighlight: true
    // });
    // $('#startDate').datepicker().on('changeDate', function (e) {
    //   const endDate = document.getElementById('endDate') as HTMLInputElement;
    //   console.log(endDate.value);
    //   console.log(e.currentTarget.value);
    //   // this.getMonthly(e.currentTarget.value, endDate.value);
    // });
    // $('#endDate').datepicker().on('changeDate', function (e) {
    //   const startDate = document.getElementById('startDate') as HTMLInputElement;
    //   console.log(startDate.value);
    //   console.log(e.currentTarget.value);
    //   // this.getMonthly(startDate.value, e.currentTarget.value);
    // });
    this.getMonthly(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
    this.initLoadChart(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
  }

  public getData() {
    const firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    const lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    const txtMonth = document.getElementById('txtMonth') as HTMLInputElement;
    txtMonth.value = this.convertDateFormat(firstDay).substring(3, 10);
    // this.monthIndex = this.today.getMonth();
    console.log(this.monthIndex);
    // const startDate = document.getElementById('startDate') as HTMLInputElement;
    // const endDate = document.getElementById('endDate') as HTMLInputElement;
    $('#increase').attr('disabled', true);
    $('#decrease').attr('disabled', true);
    $('#previous').attr('disabled', true);
    $('#next').attr('disabled', true);
    this.getMonthly(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
    this.barChart.destroy();
    this.initLoadChart(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
  }
  private getMonthly(startDate, endDate) {
    this.resAPI.getMonthlyMeeting(startDate, endDate).subscribe(result => {
      console.log(result);
      this.branches = result.data;
      this.branchNum = this.branches.length;
      this.branchInput = document.getElementById('branchId') as HTMLInputElement;
      this.branchInput.value = this.branches[0].BRH_ID;
      this.mgrsName = result.data[0].MGRS_NAME;
      this.tarAmt = this.devideMillion(result.data[0].TAR_AMT);
      this.saleAmt = this.devideMillion(result.data[0].SALE_AMT);
      this.diffTarAmt = this.devideMillion(result.data[0].DIF_TAR_AMT);
      // this.diffTarAmt = this.devideMillion(result.data[0].SALE_AMT - result.data[0].TAR_AMT);
      this.numDiffTarAmt = result.data[0].SALE_AMT - result.data[0].TAR_AMT;
      this.payAmt = this.devideMillion(result.data[0].PAY_AMT);
      this.accTarAmt = this.devideMillion(result.data[0].ACC_TAR_AMT);
      this.accSaleAmt = this.devideMillion(result.data[0].ACC_SALE_AMT);
      this.summary = this.devideMillion(result.data[0].ACC_SALE_AMT - result.data[0].ACC_TAR_AMT);
      this.numSummary = result.data[0].ACC_SALE_AMT - result.data[0].ACC_TAR_AMT;
      this.losPdoAmt = this.devideMillion(result.data[0].LOS_PDO_AMT);
      this.pdoAmt = this.devideMillion(result.data[0].PDO_AMT);
      this.oCustPDOAMT = this.devideMillion(result.data[0].OCUST_PDO_AMT);
      this.nCustPDOAMT = this.devideMillion(result.data[0].NCUST_PDO_AMT);
      this.pdoAmtPercent = ((result.data[0].PDO_AMT / result.data[0].FREMAIN_AMT) * 100).toFixed(2);
      $('#increase').removeAttr('disabled');
      $('#decrease').removeAttr('disabled');
      $('#previous').removeAttr('disabled');
      $('#next').removeAttr('disabled');
    });
  }

  initLoadChart(startDate, endDate) {
    this.displayData = [];
    this.allData = [];
    this.pathNo = [];
    this.pathName = [];
    this.pathLabels = [];
    this.pathTarAmt = [];
    this.pathSaleAmt = [];
    this.pathPayAmt = [];
    this.pathDifTarAmt = [];
    this.pathPdoLg = [];
    this.resAPI.getPathInfo(startDate, endDate).subscribe(result => {
      console.log(result);
      this.paths = result.data;
      // this.header = result.header;
      this.sort = ['สายบริการ'];
      this.header = ['สายบริการ'];
      result.header.forEach(element => {
        this.header.push(element);
        this.sort.push(element);
      });
      if (this.sortOption === null) {
        this.sortOption = this.header[0];
      }
      if ((result.data[0].BRH_ID === '01')) {
        this.currentBranch = '01';
        this.displayData = result.data.filter(e => e.BRH_ID === '01');
        this.allData = this.displayData.sort((a, b) => a.PATH_NO.localeCompare(b.PATH_NO));
        if (this.sortOption === this.header[0]) {
          this.sortByPath();
        } else if (this.sortOption === this.header[1]) {
          this.sortByTarAmt();
        } else if (this.sortOption === this.header[2]) {
          this.sortBySaleAmt();
        } else if (this.sortOption === this.header[3]) {
          this.sortByPayAmt();
        } else if (this.sortOption === this.header[4]) {
          this.sortByDiffTarAmt();
        } else if (this.sortOption === this.header[5]) {
          this.sortByPDO();
        } else {
          this.sortByPath();
        }
        // this.sortByPath();
        // result.data.forEach(element => {
        //   if (element.BRH_ID === '01') {
        //     this.pathNo.push(element.PATH_NO);
        //     this.pathName.push(element.PATH_NAME);
        //     this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
        //     this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
        //     this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
        //     this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
        //     this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
        //     this.pathPdoAmt.push(this.devideMillion(element.PDO_AMT));
        //   }
        // });
      } else {
        this.currentBranch = '02';
        this.displayData = result.data.filter(e => e.BRH_ID === '02');
        this.allData = this.displayData.sort((a, b) => a.PATH_NO.localeCompare(b.PATH_NO));
        if (this.sortOption === this.header[0]) {
          this.sortByPath();
        } else if (this.sortOption === this.header[1]) {
          this.sortByTarAmt();
        } else if (this.sortOption === this.header[2]) {
          this.sortBySaleAmt();
        } else if (this.sortOption === this.header[3]) {
          this.sortByPayAmt();
        } else if (this.sortOption === this.header[4]) {
          this.sortByDiffTarAmt();
        } else if (this.sortOption === this.header[5]) {
          this.sortByPDO();
        } else {
          this.sortByPath();
        }
        // this.sortByPath();
        // result.data.forEach(element => {
        //   if (element.BRH_ID === '02') {
        //     this.pathNo.push(element.PATH_NO);
        //     this.pathName.push(element.PATH_NAME);
        //     this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
        //     this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
        //     this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
        //     this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
        //     this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
        //     this.pathPdoAmt.push(this.devideMillion(element.PDO_AMT));
        //   }
        // });
      }
      this.dataSet = [
        {
          label: this.header[1],
          backgroundColor: constant.tarAmt.background,
          borderColor: constant.tarAmt.border,
          borderWidth: 1,
          data: this.pathTarAmt
        },
        {
          label: this.header[2],
          backgroundColor: constant.saleAmt.background,
          borderColor: constant.saleAmt.border,
          borderWidth: 1,
          data: this.pathSaleAmt
        },
        {
          label: this.header[3],
          backgroundColor: constant.payAmt.background,
          borderColor: constant.payAmt.border,
          borderWidth: 1,
          data: this.pathPayAmt
        },
        {
          label: this.header[4],
          backgroundColor: constant.diffTarAmt.background,
          borderColor: constant.diffTarAmt.border,
          borderWidth: 1,
          data: this.pathDifTarAmt
        },
        {
          label: this.header[5],
          backgroundColor: constant.pdoLg.background,
          borderColor: constant.pdoLg.border,
          borderWidth: 1,
          data: this.pathPdoLg,
          hidden: true
        }
      ];
      const bdata = {
        labels: this.pathLabels,
        datasets: this.dataSet
      };
      const ctxb = $('#barChart').get(0).getContext('2d');
      this.barChart = new Chart(ctxb, {
        type: 'bar',
        data: bdata,
        ticks: {
          autoSkip: false
        }
      });
    });
  }

  private RenderChartbyPath(display, index) {
    this.currentPath = this.allData[index];
    this.pathNo = [];
    this.pathName = [];
    this.pathLabels = [];
    this.pathTarAmt = [];
    this.pathSaleAmt = [];
    this.pathPayAmt = [];
    this.pathDifTarAmt = [];
    this.pathPdoLg = [];
    if (display === false) {
      this.displayData = this.displayData.filter(e => e !== this.currentPath);
      if (this.sortOption === this.header[0]) {
        this.sortByPath();
      } else if (this.sortOption === this.header[1]) {
        this.sortByTarAmt();
      } else if (this.sortOption === this.header[2]) {
        this.sortBySaleAmt();
      } else if (this.sortOption === this.header[3]) {
        this.sortByPayAmt();
      } else if (this.sortOption === this.header[4]) {
        this.sortByDiffTarAmt();
      } else if (this.sortOption === this.header[5]) {
        this.sortByPDO();
      } else {
        this.sortByPath();
      }
    } else {
      this.displayData.push(this.currentPath);
      if (this.sortOption === this.header[0]) {
        this.sortByPath();
      } else if (this.sortOption === this.header[1]) {
        this.sortByTarAmt();
      } else if (this.sortOption === this.header[2]) {
        this.sortBySaleAmt();
      } else if (this.sortOption === this.header[3]) {
        this.sortByPayAmt();
      } else if (this.sortOption === this.header[4]) {
        this.sortByDiffTarAmt();
      } else if (this.sortOption === this.header[5]) {
        this.sortByPDO();
      } else {
        this.sortByPath();
      }
    }
    this.dataSet = [
      {
        label: this.header[1],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 1,
        data: this.pathTarAmt
      },
      {
        label: this.header[2],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 1,
        data: this.pathSaleAmt
      },
      {
        label: this.header[3],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 1,
        data: this.pathPayAmt
      },
      {
        label: this.header[4],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 1,
        data: this.pathDifTarAmt
      },
      {
        label: this.header[5],
        backgroundColor: constant.pdoLg.background,
        borderColor: constant.pdoLg.border,
        borderWidth: 1,
        data: this.pathPdoLg,
        hidden: true
      }
    ];
    const bdata = {
      labels: this.pathLabels,
      datasets: this.dataSet
    };
    const ctxb = $('#barChart').get(0).getContext('2d');
    this.barChart.destroy();
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata
    });
  }
  private RenderChartbyBrh(brh) {
    this.displayData = [];
    this.allData = [];
    this.pathNo = [];
    this.pathName = [];
    this.pathLabels = [];
    this.pathTarAmt = [];
    this.pathSaleAmt = [];
    this.pathPayAmt = [];
    this.pathDifTarAmt = [];
    this.pathPdoLg = [];
    const branch = this.paths.filter(element => element.BRH_ID === brh);
    this.displayData = branch;
    this.allData = this.displayData.sort((a, b) => a.PATH_NO.localeCompare(b.PATH_NO));
    // this.sortOption = this.header[0];
    if (noUndefined(branch)) {
      console.log(this.sortOption);
      if (this.sortOption === this.header[0]) {
        this.sortByPath();
      } else if (this.sortOption === this.header[1]) {
        this.sortByTarAmt();
      } else if (this.sortOption === this.header[2]) {
        this.sortBySaleAmt();
      } else if (this.sortOption === this.header[3]) {
        this.sortByPayAmt();
      } else if (this.sortOption === this.header[4]) {
        this.sortByDiffTarAmt();
      } else if (this.sortOption === this.header[5]) {
        this.sortByPDO();
      } else {
        this.sortByPath();
      }
      // this.currentBranch = brh;
      // branch.forEach(element => {
      //   this.pathNo.push(element.PATH_NO);
      //   this.pathName.push(element.PATH_NAME);
      //   this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
      //   this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
      //   this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
      //   this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
      //   this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
      //   this.pathPdoLg.push(this.devideMillion(element.PDO_LOSS_GAIN));
      // });
    }
    this.dataSet = [
      {
        label: this.header[1],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 1,
        data: this.pathTarAmt
      },
      {
        label: this.header[2],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 1,
        data: this.pathSaleAmt
      },
      {
        label: this.header[3],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 1,
        data: this.pathPayAmt
      },
      {
        label: this.header[4],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 1,
        data: this.pathDifTarAmt
      },
      {
        label: this.header[5],
        backgroundColor: constant.pdoLg.background,
        borderColor: constant.pdoLg.border,
        borderWidth: 1,
        data: this.pathPdoLg,
        hidden: true
      }
    ];
    const bdata = {
      labels: this.pathLabels,
      datasets: this.dataSet
    };
    const ctxb = $('#barChart').get(0).getContext('2d');
    this.barChart.destroy();
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata
    });
  }

  private newRenderTable(brh) {
    this.currentBranch = brh;
    this.branchIndex = this.branches.findIndex(element => element.BRH_ID === brh);
    const branch = this.branches.filter(element => element.BRH_ID === brh)[0];
    if (noUndefined(branch)) {
      this.branchInput.value = branch.BRH_ID;
      this.mgrsName = branch.MGRS_NAME;
      this.tarAmt = this.devideMillion(branch.TAR_AMT);
      this.saleAmt = this.devideMillion(branch.SALE_AMT);
      // this.diffTarAmt = devideMillion(result.data[0].DIF_TAR_AMT);
      this.diffTarAmt = this.devideMillion(branch.DIF_TAR_AMT);
      this.numDiffTarAmt = branch.SALE_AMT - branch.TAR_AMT;
      this.payAmt = this.devideMillion(branch.PAY_AMT);
      this.accTarAmt = this.devideMillion(branch.ACC_TAR_AMT);
      this.accSaleAmt = this.devideMillion(branch.ACC_SALE_AMT);
      this.summary = this.devideMillion(branch.ACC_SALE_AMT - branch.ACC_TAR_AMT);
      this.numSummary = branch.ACC_SALE_AMT - branch.ACC_TAR_AMT;
      this.losPdoAmt = this.devideMillion(branch.LOS_PDO_AMT);
      this.pdoAmt = this.devideMillion(branch.PDO_AMT);
      this.oCustPDOAMT = this.devideMillion(branch.OCUST_PDO_AMT);
      this.nCustPDOAMT = this.devideMillion(branch.NCUST_PDO_AMT);
      this.pdoAmtPercent = ((branch.PDO_AMT / branch.FREMAIN_AMT) * 100).toFixed(2);
    }
  }
  onChange(data, select) {
    const path = data.target.innerText;
    const checked = data.target.childNodes[0].checked;
    const index = this.allData.findIndex(e => e.PATH_NO === data.target.innerText);
    this.RenderChartbyPath(checked === true ? false : true, index);
    // this.newRenderChart(branch, checked === true ? false : true, index);

    // this.newRenderTable(deviceValue);
    // this.newRenderChart(deviceValue);
  }
  increase(data) {
    this.nextItem();
  }
  selectBranch(data) {
    this.newRenderTable(data.value);
    this.RenderChartbyBrh(data.value);
  }
  decrease(data) {
    this.prevItem();
  }
  previous(data) {
    this.prevMonth();
  }
  next(data) {
    this.nextMonth();
  }
  nextMonth() {
    this.monthIndex++;
    this.today.setMonth(this.today.getMonth() + 1);
    // this.monthIndex = this.monthIndex / monthNames.length;
    if (this.monthIndex > 11) {
      this.monthIndex = 0;
      this.year++;
      this.today.setMonth(this.today.getMonth() - 12);
      this.today.setFullYear(this.today.getFullYear() + 1);
      this.year = this.today.getFullYear() + 543;
    }
    $('#previous').attr('disabled', true);
    $('#next').attr('disabled', true);
    $('#increase').attr('disabled', true);
    $('decrease').attr('disabled', true);
    this.today.setMonth(this.monthIndex);
    const firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    const lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    const txtMonth = document.getElementById('txtMonth') as HTMLInputElement;
    txtMonth.value = this.convertDateFormat(firstDay).substring(3, 10);
    this.month = monthNames[this.today.getMonth()];
    this.getMonthly(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
    this.barChart.destroy();
    this.initLoadChart(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
  }
  prevMonth() {
    if (this.monthIndex === 0) {
      this.monthIndex = monthNames.length;
      this.year--;
      this.year = this.today.getFullYear() + 543;
    }
    this.monthIndex--;
    $('#previous').attr('disabled', true);
    $('#next').attr('disabled', true);
    $('#increase').attr('disabled', true);
    $('#decrease').attr('disabled', true);
    this.today.setMonth(this.today.getMonth() - 1);
    const firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    const lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    const txtMonth = document.getElementById('txtMonth') as HTMLInputElement;
    txtMonth.value = this.convertDateFormat(firstDay).substring(3, 10);
    this.month = monthNames[this.today.getMonth()];
    this.getMonthly(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
    this.barChart.destroy();
    this.initLoadChart(this.convertDateFormat(firstDay), this.convertDateFormat(lastDay));
  }
  nextItem() {
    this.branchIndex++; // increase i by one
    this.branchIndex = this.branchIndex % this.branchNum; // if we've gone too high, start from `0` again
    this.newRenderTable(this.branches[this.branchIndex].BRH_ID);
    this.RenderChartbyBrh(this.branches[this.branchIndex].BRH_ID);
  }
  prevItem() {
    if (this.branchIndex === 0) { // i would become 0
      this.branchIndex = this.branchNum; // so put it at the other end of the array
    }
    this.branchIndex--; // decrease by one
    this.newRenderTable(this.branches[this.branchIndex].BRH_ID);
    this.RenderChartbyBrh(this.branches[this.branchIndex].BRH_ID);
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
  private devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
  sortBy(data) {
    console.log(data);
    this.pathNo = [];
    this.pathName = [];
    this.pathLabels = [];
    this.pathTarAmt = [];
    this.pathSaleAmt = [];
    this.pathPayAmt = [];
    this.pathDifTarAmt = [];
    this.pathPdoLg = [];
    if (data === this.header[0]) {
      this.sortOption = this.header[0];
      this.sortByPath();
    } else if (data === this.header[1]) {
      this.sortOption = this.header[1];
      this.sortByTarAmt();
    } else if (data === this.header[2]) {
      this.sortOption = this.header[2];
      this.sortBySaleAmt();
    } else if (data === this.header[3]) {
      this.sortOption = this.header[3];
      this.sortByPayAmt();
    } else if (data === this.header[4]) {
      this.sortOption = this.header[4];
      this.sortByDiffTarAmt();
    } else if (data === this.header[5]) {
      this.sortOption = this.header[5];
      this.sortByPDO();
    } else {
      this.sortByPath();
    }
    this.dataSet = [];
    this.dataSet = [
      {
        label: this.header[1],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 2,
        data: this.pathTarAmt
      },
      {
        label: this.header[2],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 2,
        data: this.pathSaleAmt
      },
      {
        label: this.header[3],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 2,
        data: this.pathPayAmt
      },
      {
        label: this.header[4],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 2,
        data: this.pathDifTarAmt
      },
      {
        label: this.header[5],
        backgroundColor: constant.pdoLg.background,
        borderColor: constant.pdoLg.border,
        borderWidth: 2,
        data: this.pathPdoLg,
        hidden: true
      }
    ];
    const bdata = {
      labels: this.pathLabels,
      datasets: this.dataSet
    };
    const ctxb = $('#barChart').get(0).getContext('2d');
    this.barChart.destroy();
    this.barChart = new Chart(ctxb, {
      type: 'bar',
      data: bdata,
    });
  }
  private sortByPath() {
    this.displayData.forEach(e => this.pathNo.push(e.PATH_NO));
    this.pathNo.sort();
    for (const i of this.pathNo) {
      for (const j of this.displayData) {
        if (i === j.PATH_NO) {
          this.pathLabels.push(j.PATH_NO + ` ${j.PATH_NAME}`);
          this.pathName.push(j.PATH_NAME);
          this.pathTarAmt.push(this.devideMillion(j.TAR_AMT));
          this.pathSaleAmt.push(this.devideMillion(j.SALE_AMT));
          this.pathPayAmt.push(this.devideMillion(j.PAY_AMT));
          this.pathPdoLg.push(this.devideMillion(j.PDO_LOSS_GAIN));
          this.pathDifTarAmt.push(this.devideMillion(j.DIF_TAR_AMT));
        }
      }
    }
  }
  private sortByTarAmt() {
    this.displayData.sort(function (a, b) { return a.TAR_AMT - b.TAR_AMT; });
    this.displayData.forEach(element => {
      this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
      this.pathNo.push(element.PATH_NO);
      this.pathName.push(element.PATH_NAME);
      this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
      this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
      this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
      this.pathPdoLg.push(this.devideMillion(element.PDO_LOSS_GAIN));
      this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
    });
  }
  private sortBySaleAmt() {
    this.displayData.sort(function (a, b) { return a.SALE_AMT - b.SALE_AMT; });
    this.displayData.forEach(element => {
      this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
      this.pathNo.push(element.PATH_NO);
      this.pathName.push(element.PATH_NAME);
      this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
      this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
      this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
      this.pathPdoLg.push(this.devideMillion(element.PDO_LOSS_GAIN));
      this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
    });
  }
  private sortByPayAmt() {
    this.displayData.sort(function (a, b) { return a.PAY_AMT - b.PAY_AMT; });
    this.displayData.forEach(element => {
      this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
      this.pathNo.push(element.PATH_NO);
      this.pathName.push(element.PATH_NAME);
      this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
      this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
      this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
      this.pathPdoLg.push(this.devideMillion(element.PDO_LOSS_GAIN));
      this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
    });
  }
  private sortByDiffTarAmt() {
    this.displayData.sort(function (a, b) { return a.DIF_TAR_AMT - b.DIF_TAR_AMT; });
    this.displayData.forEach(element => {
      this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
      this.pathNo.push(element.PATH_NO);
      this.pathName.push(element.PATH_NAME);
      this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
      this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
      this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
      this.pathPdoLg.push(this.devideMillion(element.PDO_LOSS_GAIN));
      this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
    });
  }
  private sortByPDO() {
    this.displayData.sort(function (a, b) { return a.PDO_LOSS_GAIN - b.PDO_LOSS_GAIN; });
    this.displayData.forEach(element => {
      this.pathPdoLg.push(this.devideMillion(element.PDO_LOSS_GAIN));
      this.pathNo.push(element.PATH_NO);
      this.pathName.push(element.PATH_NAME);
      this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
      this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
      this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
      this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
      this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
    });
  }
}
