import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { noUndefined } from '@angular/compiler/src/util';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
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
  private branches = [];
  private branchInput: HTMLInputElement;
  private branchIndex = 0;
  private branchNum: number;
  public month: string;
  constructor(private resAPI: AppserverService, private router: Router) { }

  ngOnInit() {
    App.initLoadJquery();
    this.initialLoadChart();
    const today = new Date(Date.now());
    this.month = monthNames[today.getMonth() - 1];
  }
  private devideMillion(data: number) {
    return (data / 1000000).toFixed(2);
  }
  private initialLoadChart() {
    this.resAPI.getMonthlyMeeting().subscribe(result => {
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
  private newRenderChart(brh) {
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
    this.newRenderChart(deviceValue);
  }
  increase(data) {
    this.nextItem();
    // var inputBranch = document.getElementById("branchId") as HTMLInputElement;
    // let branchId = parseInt(inputBranch.value);
  }
  selectBranch(data) {
    this.newRenderChart(data.value);
  }
  decrease(data) {
    this.prevItem();
    // const RouteList: Routes = [
    //   { path: 'home', component: HomeComponent, data: {test: 'test'}},
    // ];
    // RouterModule.forChild(RouteList);
    window.open(`home?title=${this.saleAmt}&content=รับสมัครเจ้าหน้าที่ฝ่ายการตลาดและฝ่ายติด&category=ข่าวทั่วไป
    &image=d07ccceb-797d-59e7-bbbf-118987dd83bd.png`);
  }
  nextItem() {
    this.branchIndex++; // increase i by one
    this.branchIndex = this.branchIndex % this.branchNum; // if we've gone too high, start from `0` again
    this.newRenderChart(this.branches[this.branchIndex].BRH_ID);
  }
  prevItem() {
    if (this.branchIndex === 0) { // i would become 0
      this.branchIndex = this.branchNum; // so put it at the other end of the array
    }
    this.branchIndex--; // decrease by one
    this.newRenderChart(this.branches[this.branchIndex].BRH_ID);
  }
}
