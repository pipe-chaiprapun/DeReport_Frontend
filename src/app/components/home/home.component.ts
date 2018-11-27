import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'hammerjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cardData= [];


  constructor(private http: HttpClient, private __appserverservice: AppserverService) { }



  ngOnInit() {
    this.cardNEWS();
  }



  //  รับข้อมูลข่าว
  private cardNEWS() {
    this.__appserverservice.getNews().subscribe(result => {
      console.log(result)
      this.cardData = result.data;
      console.log(this.cardData)
    });
  }

}
