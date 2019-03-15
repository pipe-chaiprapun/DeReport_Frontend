import { Component, OnInit } from '@angular/core';
import { MobileService } from 'src/app/services/mobile.service';
import { Router } from '@angular/router';
import { Library } from '../../services/library';
declare const App;
declare const $;
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  public contract = [];
  public cust_name: string;
  private cust_no;
  private library: Library;
  constructor(private resAPI: MobileService, private router: Router) { }

  ngOnInit() {
    this.library = new Library();
    App.initLoadJquery();
    this.resAPI.getProfile(7558).subscribe(result => {
      this.cust_no = result.CUST_NO;
      this.cust_name = result.CUST_NAME;
    });
    this.resAPI.getContract(7558).subscribe(result => {
      console.log(result);
      result.forEach(element => {
        this.contract.push(element);
      });
      this.contract.forEach(element => {
        element.TOT_AMT = this.numberWithCommas(element.TOT_AMT);
        element.PAY_AMT = this.numberWithCommas(element.PAY_AMT);

        element.DISC_AMT = this.numberWithCommas(element.DISC_AMT);
        element.BAL_AMT = this.numberWithCommas(element.BAL_AMT);
        const date = new Date(element.CON_DATE);
        element.CON_DATE = this.library.convertFullDateFormat(date);
      });
    });
    // $('#web').load('https://www.google.co.th');
  }
  viewPayment(id, con_date, tot_amt, period, pay_amt, discount, balance) {
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/contractpayment', this.cust_no, this.cust_name, id, con_date, tot_amt, period, pay_amt, discount, balance]);
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
