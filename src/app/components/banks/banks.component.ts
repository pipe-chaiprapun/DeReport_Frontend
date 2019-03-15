import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileService } from 'src/app/services/mobile.service';
import { AppUrl } from 'src/app/app.url';
import { Renderer } from '@angular/core';
declare const App;
declare const $;
@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  private con_no;
  private cust_no;
  private pay_amt;
  constructor(private route: ActivatedRoute, private resAPI: MobileService, private router: Router, private renderer: Renderer) { }

  ngOnInit() {
    App.initLoadJquery();
    this.route.params.subscribe(params => {
      console.log(params);
      this.cust_no = params['cust_no'];
      this.con_no = params['con_no'];
      this.pay_amt = params['pay_amt'];
      // this.resAPI.getContractPayment(this.con_no).subscribe(result => {
      //   console.log(result);
      //   result.forEach(element => {
      //     this.con_payment.push(element);
      //   });
      // });
    });
  }
  clear() {
    const txtPhone = document.getElementById('txtPhone') as HTMLInputElement;
    txtPhone.placeholder = '';
  }
  pay(bank) {
    const data = {
      CustomerID: this.cust_no,
      Amount: Number(this.pay_amt + '00'),
      ChannelCode: bank
    };
    if (bank === 'payplus_kbank') {
      const txtPhone = document.getElementById('txtPhone') as HTMLInputElement;
      if (txtPhone.value === '') {
        txtPhone.placeholder = 'กรุณากรอกหมายเลขโทรศัพท์';
      } else {
        this.resAPI.createPayment(data).subscribe(result => {
          console.log(result);
          if (result.data.Message === 'Success') {
            window.open(result.data.PaymentUrl, '_blank');
          }
        });
      }
    } else {
      this.resAPI.createPayment(data).subscribe(result => {
        console.log(result);
        if (result.data.Message === 'Success') {
          window.open(result.data.PaymentUrl, '_blank');
        }
      });
    }
  }
}
