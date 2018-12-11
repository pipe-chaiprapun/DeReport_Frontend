import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const App;
declare const $;

@Component({
  selector: 'app-food-management',
  templateUrl: './food-management.component.html',
  styleUrls: ['./food-management.component.css']
})
export class FoodManagementComponent implements OnInit {
  public abc = this.__Appserver.foodmenu;
  fileToUpload: File = null;

  constructor(private http: HttpClient,private __Appserver: AppserverService) { }



  ngOnInit() {
    this.menuDate();
    // this.menuData();
  }

  

  private menuDate() {
    $('#startDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true
    });
  }


  // private menuData() {
  //   this.__Appserver.foodmenu.forEach(element => {
  //     this.abc = element;
  //     console.log(this.abc);
  //   })
  // }


}
