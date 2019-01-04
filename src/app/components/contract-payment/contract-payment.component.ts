import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileService } from 'src/app/services/mobile.service';
import { AppUrl } from 'src/app/app.url';
declare const App;

@Component({
  selector: 'app-contract-payment',
  templateUrl: './contract-payment.component.html',
  styleUrls: ['./contract-payment.component.css']
})
export class ContractPaymentComponent implements OnInit {

  public cust_name;
  public con_no;
  public con_date;
  public tot_amt;
  public period;
  public pay_amt;
  public discount;
  public balance;
  public con_payment = [];
  constructor(private route: ActivatedRoute, private resAPI: MobileService, private router: Router) { }

  ngOnInit() {
    App.initLoadJquery();
    this.route.params.subscribe(params => {
      console.log(params);
      this.cust_name = params['cust_name'];
      this.con_no = params['id'];
      this.con_date = params['con_date'];
      this.tot_amt = params['tot_amt'];
      this.period = params['period'];
      this.pay_amt = params['pay_amt'];
      this.discount = params['discount'];
      this.balance = params['balance'];
      this.resAPI.getContractPayment(this.con_no).subscribe(result => {
        console.log(result);
        result.forEach(element => {
          this.con_payment.push(element);
        });
      });
   });
  }
  // tslint:disable-next-line:member-ordering
  Url = AppUrl;
  back() {
    this.router.navigate(['/contract']);
  }
}
