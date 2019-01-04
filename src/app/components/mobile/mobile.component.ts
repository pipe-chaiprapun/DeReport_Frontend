import { Component, OnInit } from '@angular/core';
import { MobileService } from 'src/app/services/mobile.service';
import { AppUrl } from 'src/app/app.url';
declare const App;
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  constructor(private resAPI: MobileService) { }
  public cust_name: string;
  ngOnInit() {
    App.initLoadJquery();
    var txtCustNo = document.getElementById('txtNo') as HTMLInputElement;
    var txtName = document.getElementById('txtName') as HTMLInputElement;
    var txtNID = document.getElementById('txtNID') as HTMLInputElement;
    var txtPhone = document.getElementById('txtPhone') as HTMLInputElement;
    this.resAPI.getProfile(158321).subscribe(result => {
      console.log(result);
      this.cust_name = result.CUST_NAME;
      txtCustNo.value = result.CUST_NO;
      txtName.value = result.CUST_NAME;
      txtNID.value = result.CITIZEN_NO;
      txtPhone.value = result.TEL;
    });
  }
  // tslint:disable-next-line:member-ordering
  Url = AppUrl;
}
