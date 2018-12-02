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
  private header = [];
  private pathNo = [];
  private pathName = [];
  private pathLabels = [];
  private pathTarAmt = [];
  private pathSaleAmt = [];
  private pathPayAmt = [];
  private pathDifTarAmt = [];
  private pathPdoAmt = [];
  private dataSet = [];
  private barChart;

  public month: string;
  public year;
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
    this.initLoadUI();
    const today = new Date(Date.now());
    this.month = monthNames[today.getMonth() - 1];
    this.year = today.getFullYear() + 543;
  }

  private initLoadUI() {
    const today = new Date(Date.now());
    today.setMonth(today.getMonth() - 1);
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startDt = document.getElementById('startDate') as HTMLInputElement;
    const endDt = document.getElementById('endDate') as HTMLInputElement;
    startDt.value = this.convertDateFormat(firstDay);
    endDt.value = this.convertDateFormat(lastDay);
    $('#startDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true
    });
    $('#endDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true
    });
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
    const startDate = document.getElementById('startDate') as HTMLInputElement;
    const endDate = document.getElementById('endDate') as HTMLInputElement;
    console.log(startDate.value);
    console.log(endDate.value);
    this.getMonthly(startDate.value, endDate.value);
    this.barChart.destroy();
    this.initLoadChart(startDate.value, endDate.value);
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
      // this.diffTarAmt = devideMillion(result.data[0].DIF_TAR_AMT);
      this.diffTarAmt = this.devideMillion(result.data[0].SALE_AMT - result.data[0].TAR_AMT);
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
    });
  }

  initLoadChart(startDate, endDate) {
    this.resAPI.getPathInfo(startDate, endDate).subscribe(result => {
      console.log(result);
      this.paths = result.data;
      this.header = result.header;
      console.log(result.data[0].BRH_ID === '01');
      if ((result.data[0].BRH_ID === '01')) {
        this.currentBranch = '01';
        result.data.forEach(element => {
          if (element.BRH_ID === '01') {
            this.pathNo.push(element.PATH_NO);
            this.pathName.push(element.PATH_NAME);
            this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
            this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
            this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
            this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
            this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
            this.pathPdoAmt.push(this.devideMillion(element.PDO_AMT));
          }
        });
      } else {
        result.data.forEach(element => {
          if (element.BRH_ID === '02') {
            this.currentBranch = '02';
            this.pathNo.push(element.PATH_NO);
            this.pathName.push(element.PATH_NAME);
            this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
            this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
            this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
            this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
            this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
            this.pathPdoAmt.push(this.devideMillion(element.PDO_AMT));
          }
        });
      }
      this.dataSet = [
        {
          label: this.header[0],
          backgroundColor: constant.tarAmt.background,
          borderColor: constant.tarAmt.border,
          borderWidth: 1,
          data: this.pathTarAmt
        },
        {
          label: this.header[1],
          backgroundColor: constant.saleAmt.background,
          borderColor: constant.saleAmt.border,
          borderWidth: 1,
          data: this.pathSaleAmt
        },
        {
          label: this.header[2],
          backgroundColor: constant.payAmt.background,
          borderColor: constant.payAmt.border,
          borderWidth: 1,
          data: this.pathPayAmt
        },
        {
          label: this.header[3],
          backgroundColor: constant.diffTarAmt.background,
          borderColor: constant.diffTarAmt.border,
          borderWidth: 1,
          data: this.pathDifTarAmt,
          hidden: true
        },
        {
          label: this.header[4],
          backgroundColor: constant.pdoAmt.background,
          borderColor: constant.pdoAmt.border,
          borderWidth: 1,
          data: this.pathPdoAmt
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

  private newRenderChart(brh) {
    this.pathNo = [];
    this.pathName = [];
    this.pathLabels = [];
    this.pathTarAmt = [];
    this.pathSaleAmt = [];
    this.pathPayAmt = [];
    this.pathDifTarAmt = [];
    this.pathPdoAmt = [];
    const branch = this.paths.filter(element => element.BRH_ID === brh);
    console.log(branch);
    if (noUndefined(branch)) {
      this.currentBranch = brh;
      branch.forEach(element => {
        // if (element.BRH_ID === brh) {
          this.pathNo.push(element.PATH_NO);
          this.pathName.push(element.PATH_NAME);
          this.pathLabels.push(element.PATH_NO + ` ${element.PATH_NAME}`);
          this.pathTarAmt.push(this.devideMillion(element.TAR_AMT));
          this.pathSaleAmt.push(this.devideMillion(element.SALE_AMT));
          this.pathPayAmt.push(this.devideMillion(element.PAY_AMT));
          this.pathDifTarAmt.push(this.devideMillion(element.DIF_TAR_AMT));
          this.pathPdoAmt.push(this.devideMillion(element.PDO_AMT));
        // }
      });
    }
    this.dataSet = [
      {
        label: this.header[0],
        backgroundColor: constant.tarAmt.background,
        borderColor: constant.tarAmt.border,
        borderWidth: 1,
        data: this.pathTarAmt
      },
      {
        label: this.header[1],
        backgroundColor: constant.saleAmt.background,
        borderColor: constant.saleAmt.border,
        borderWidth: 1,
        data: this.pathSaleAmt
      },
      {
        label: this.header[2],
        backgroundColor: constant.payAmt.background,
        borderColor: constant.payAmt.border,
        borderWidth: 1,
        data: this.pathPayAmt
      },
      {
        label: this.header[3],
        backgroundColor: constant.diffTarAmt.background,
        borderColor: constant.diffTarAmt.border,
        borderWidth: 1,
        data: this.pathDifTarAmt,
        hidden: true
      },
      {
        label: this.header[4],
        backgroundColor: constant.pdoAmt.background,
        borderColor: constant.pdoAmt.border,
        borderWidth: 1,
        data: this.pathPdoAmt
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
    this.branchIndex = this.branches.findIndex(element => element.BRH_ID === brh);
    const branch = this.branches.filter(element => element.BRH_ID === brh)[0];
    if (noUndefined(branch)) {
      this.branchInput.value = branch.BRH_ID;
      this.mgrsName = branch.MGRS_NAME;
      this.tarAmt = this.devideMillion(branch.TAR_AMT);
      this.saleAmt = this.devideMillion(branch.SALE_AMT);
      // this.diffTarAmt = devideMillion(result.data[0].DIF_TAR_AMT);
      this.diffTarAmt = this.devideMillion(branch.SALE_AMT - branch.TAR_AMT);
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
  onChange(deviceValue) {
    this.newRenderTable(deviceValue);
    this.newRenderChart(deviceValue);
  }
  increase(data) {
    this.nextItem();
    // var inputBranch = document.getElementById("branchId") as HTMLInputElement;
    // let branchId = parseInt(inputBranch.value);
  }
  selectBranch(data) {
    this.newRenderTable(data.value);
    this.newRenderChart(data.value);
  }
  decrease(data) {
    this.prevItem();
    // const RouteList: Routes = [
    //   { path: 'home', component: HomeComponent, data: {test: 'test'}},
    // ];
    // RouterModule.forChild(RouteList);
    // window.open(`home?title=${this.saleAmt}&content=รับสมัครเจ้าหน้าที่ฝ่ายการตลาดและฝ่ายติด&category=ข่าวทั่วไป
    // &image=d07ccceb-797d-59e7-bbbf-118987dd83bd.png`);
  }
  nextItem() {
    this.branchIndex++; // increase i by one
    this.branchIndex = this.branchIndex % this.branchNum; // if we've gone too high, start from `0` again
    this.newRenderTable(this.branches[this.branchIndex].BRH_ID);
    this.newRenderChart(this.branches[this.branchIndex].BRH_ID);
  }
  prevItem() {
    if (this.branchIndex === 0) { // i would become 0
      this.branchIndex = this.branchNum; // so put it at the other end of the array
    }
    this.branchIndex--; // decrease by one
    this.newRenderTable(this.branches[this.branchIndex].BRH_ID);
    this.newRenderChart(this.branches[this.branchIndex].BRH_ID);
  }
  test(data) {
    console.log(data);
    console.log('kuy');
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
}
