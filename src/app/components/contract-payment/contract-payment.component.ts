import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileService } from 'src/app/services/mobile.service';
import { AppUrl } from 'src/app/app.url';
declare const App;
declare const $;
const banks = ['internetbank_bbl', 'payplus_kbank', 'internetbank_bay', 'internetbank_ktb', 'internetbank_scb'];
@Component({
  selector: 'app-contract-payment',
  templateUrl: './contract-payment.component.html',
  styleUrls: ['./contract-payment.component.css']
})
export class ContractPaymentComponent implements OnInit {
  public transactionHub;
  public connection;

  public resPayment = {
    icon: 'fa fa-check-circle-o',
    header: 'ชำระเงินสำเร็จ',
    title: 'การโอนชำระสำเร็จ',
    body: 'รายการโอนชำระค่าสินค้าของท่านได้รับการอนุมัติแล้ว'
  };

  public cust_name;
  private cust_no;
  public con_no;
  public con_date;
  public tot_amt;
  public period;
  public pay_amt;
  public discount;
  public balance;
  public con_payment = [];
  public selectBank: number;
  public currentNum: string;
  public confirmNum: string;
  private txtPayAmt: HTMLInputElement;
  private txtPhone: HTMLInputElement;
  constructor(private route: ActivatedRoute, private resAPI: MobileService, private router: Router, private detactor: ChangeDetectorRef) { }

  ngOnInit() {
    App.initLoadJquery();
    $.connection.hub.url = 'http://35.247.128.114/signalr';
    this.connection = $.connection;
    this.transactionHub = $.connection.transactionHub;
    const self = this;
    console.log(this.transactionHub);
    this.transactionHub.client.login = function(data) {
      console.log(data.message + ' is online');
    };
    this.transactionHub.client.notify = function(data) {
      console.log(data);
      if (data.Message === 'Success') {
        $('#notifyPaymentSuccess').modal('show');
      } else {
        $('#notifyPaymentFail').modal('show');
      }
    };
    this.connection.hub.start();

    $('#confirmPayment').on('hide.bs.modal', function (e) {
      if (location.hash === '#modal') { window.history.back(); }
    });

    $(window).on('popstate', function (event) {
      if (event.state !== null) { $('.modal').modal('hide'); }
    });
    this.txtPayAmt = document.getElementById('txtPayAmt') as HTMLInputElement;
    this.txtPhone = document.getElementById('txtPhone') as HTMLInputElement;
    this.route.params.subscribe(params => {
      console.log(params);
      this.cust_no = params['cust_no'];
      this.cust_name = params['cust_name'];
      this.con_no = params['id'];
      this.con_date = params['con_date'];
      this.tot_amt = params['tot_amt'];
      this.period = params['period'];
      this.pay_amt = params['pay_amt'];
      this.discount = params['discount'];
      this.balance = params['balance'];
      this.currentNum = this.pay_amt;
      this.confirmNum = this.numberWithCommas(this.pay_amt);
      // this.resAPI.getContractPayment(this.con_no).subscribe(result => {
      //   console.log(result);
      //   result.forEach(element => {
      //     this.con_payment.push(element);
      //   });
      // });
    });
  }
  // tslint:disable-next-line:member-ordering
  Url = AppUrl;
  back() {
    this.router.navigate(['/contract']);
  }
  pay() {
    console.log(this.currentNum);
    const add = this.currentNum.includes('.');
    console.log(this.currentNum.replace('.', ''));
    const data = {
      CustomerID: this.cust_no,
      Amount: add === true ? this.currentNum.replace('.', '') : Number(this.currentNum + '00'),
      ChannelCode: banks[this.selectBank]
    };
    console.log(data);
    this.resAPI.createPayment(data).subscribe(result => {
      console.log(result);
      if (result.data.Message === 'Success') {
        window.open(result.data.PaymentUrl, '_blank');
      }
    });
    // tslint:disable-next-line:max-line-length
    // this.router.navigate(['/bankselection', this.con_no, this.cust_no, this.pay_amt]);
  }
  clear() {
    this.txtPhone.value = '';
  }
  select(data) {
    this.selectBank = data;
  }
  onNumChange(data) {
    const pay = Number(data.replace(',', ''));
    const discount = Number(this.discount.replace(',', ''));
    const balance = Number(this.balance.replace(',', ''));
    const realPay = balance - discount;
    if (pay > realPay) {
      alert('จำนวนเงินที่ต้องการชำระมากกว่ายอดคงเหลือหลังจากที่หักส่วนลดแล้ว');
      this.txtPayAmt.value = this.currentNum;
    } else {
      this.pay_amt = this.numberWithCommas(pay);
      this.currentNum = pay.toString();
      this.confirmNum = this.numberWithCommas(pay);
    }
    // const txtBal = document.getElementById('txtBal') as HTMLInputElement;
    // let bal = Number(this.balance.replace(',', ''));
    // bal = bal - data;
    // txtBal.value = this.numberWithCommas(bal);
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
