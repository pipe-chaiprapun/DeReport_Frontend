import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../../services/appserver.service';
import { Library } from '../../../services/library';
import { noUndefined } from '@angular/compiler/src/util';
declare const $;
@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  private library: Library;
  public monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษพาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
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

  public today: Date;
  private firstDay: Date;
  private lastDay: Date;
  public month;
  public year;

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initLoadTable();
  }
  private initLoadTable() {
    this.library = new Library();
    this.today = new Date(Date.now());
    this.today.setMonth(this.today.getMonth() - 1);
    this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    this.month = this.monthNames[this.today.getMonth()];
    this.year = this.today.getFullYear() + 543;
    this.getMonthly(this.library.convertDateFormat(this.firstDay), this.library.convertDateFormat(this.lastDay));
  }
  public increase() {
    this.branchIndex++; // increase i by one
    this.branchIndex = this.branchIndex % this.branchNum; // if we've gone too high, start from `0` again
    this.newRenderTable(this.branches[this.branchIndex].BRH_ID);
  }
  public decrease() {
      if (this.branchIndex === 0) { // i would become 0
      this.branchIndex = this.branchNum; // so put it at the other end of the array
    }
    this.branchIndex--; // decrease by one
    this.newRenderTable(this.branches[this.branchIndex].BRH_ID);
  }
  selectBranch(data) {
    this.newRenderTable(data.value);
  }
  private newRenderTable(brh) {
    this.currentBranch = brh;
    this.branchIndex = this.branches.findIndex(element => element.BRH_ID === brh);
    const branch = this.branches.filter(element => element.BRH_ID === brh)[0];
    if (noUndefined(branch)) {
      this.branchInput.value = branch.BRH_ID;
      this.mgrsName = branch.MGRS_NAME;
      this.tarAmt = this.library.devideMillion(branch.TAR_AMT);
      this.saleAmt = this.library.devideMillion(branch.SALE_AMT);
      this.diffTarAmt = this.library.devideMillion(branch.DIF_TAR_AMT);
      this.numDiffTarAmt = branch.SALE_AMT - branch.TAR_AMT;
      this.payAmt = this.library.devideMillion(branch.PAY_AMT);
      this.accTarAmt = this.library.devideMillion(branch.ACC_TAR_AMT);
      this.accSaleAmt = this.library.devideMillion(branch.ACC_SALE_AMT);
      this.summary = this.library.devideMillion(branch.ACC_SALE_AMT - branch.ACC_TAR_AMT);
      this.numSummary = branch.ACC_SALE_AMT - branch.ACC_TAR_AMT;
      this.losPdoAmt = this.library.devideMillion(branch.LOS_PDO_AMT);
      this.pdoAmt = this.library.devideMillion(branch.PDO_AMT);
      this.oCustPDOAMT = this.library.devideMillion(branch.OCUST_PDO_AMT);
      this.nCustPDOAMT = this.library.devideMillion(branch.NCUST_PDO_AMT);
      this.pdoAmtPercent = ((branch.PDO_AMT / branch.FREMAIN_AMT) * 100).toFixed(2);
    }
  }
  public next() {
    this.today.setMonth(this.today.getMonth() + 1);
    this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    this.month = this.monthNames[this.today.getMonth()];
    this.year = this.today.getFullYear() + 543;
    this.getMonthly(this.library.convertDateFormat(this.firstDay), this.library.convertDateFormat(this.lastDay));
  }
  public previous() {
    this.today.setMonth(this.today.getMonth() - 1);
    this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    this.month = this.monthNames[this.today.getMonth()];
    this.year = this.today.getFullYear() + 543;
    console.log(this.today);
    this.getMonthly(this.library.convertDateFormat(this.firstDay), this.library.convertDateFormat(this.lastDay));
  }
  private getMonthly(startDate, endDate) {
    $('#previous').attr('disabled', true);
    $('#next').attr('disabled', true);
    $('#increase').attr('disabled', true);
    $('#decrease').attr('disabled', true);
    this.resAPI.getMonthlyMeeting(startDate, endDate).subscribe(result => {
      console.log(result);
      if (result.length === 0) {
        this.clearTable();
        $('#previous').removeAttr('disabled');
        $('#next').removeAttr('disabled');
      } else {
        this.branches = result;
        this.branchNum = this.branches.length;
        this.branchInput = document.getElementById('branchId') as HTMLInputElement;
        this.branchInput.value = this.branches[0].BRH_ID;
        this.mgrsName = result[0].MGRS_NAME;
        this.tarAmt = this.library.devideMillion(result[0].TAR_AMT);
        this.saleAmt = this.library.devideMillion(result[0].SALE_AMT);
        this.diffTarAmt = this.library.devideMillion(result[0].DIF_TAR_AMT);
        this.numDiffTarAmt = result[0].SALE_AMT - result[0].TAR_AMT;
        this.payAmt = this.library.devideMillion(result[0].PAY_AMT);
        this.accTarAmt = this.library.devideMillion(result[0].ACC_TAR_AMT);
        this.accSaleAmt = this.library.devideMillion(result[0].ACC_SALE_AMT);
        this.summary = this.library.devideMillion(result[0].ACC_SALE_AMT - result[0].ACC_TAR_AMT);
        this.numSummary = result[0].ACC_SALE_AMT - result[0].ACC_TAR_AMT;
        this.losPdoAmt = this.library.devideMillion(result[0].LOS_PDO_AMT);
        this.pdoAmt = this.library.devideMillion(result[0].PDO_AMT);
        this.oCustPDOAMT = this.library.devideMillion(result[0].OCUST_PDO_AMT);
        this.nCustPDOAMT = this.library.devideMillion(result[0].NCUST_PDO_AMT);
        this.pdoAmtPercent = ((result[0].PDO_AMT / result[0].FREMAIN_AMT) * 100).toFixed(2);
        $('#increase').removeAttr('disabled');
        $('#decrease').removeAttr('disabled');
        $('#previous').removeAttr('disabled');
        $('#next').removeAttr('disabled');
      }
    });
  }
  private clearTable() {
    $('#increase').attr('disabled', true);
    $('#decrease').attr('disabled', true);
    this.branches = null;
    this.branchNum = null;
    this.branchInput.value = '';
    this.mgrsName = null;
    this.tarAmt = null;
    this.saleAmt = null;
    this.diffTarAmt = null;
    this.numDiffTarAmt = null;
    this.payAmt = null;
    this.accTarAmt = null;
    this.accSaleAmt = null;
    this.summary = null;
    this.numSummary = null;
    this.losPdoAmt = null;
    this.pdoAmt = null;
    this.oCustPDOAMT = null;
    this.nCustPDOAMT = null;
    this.pdoAmtPercent = null;
  }
}
