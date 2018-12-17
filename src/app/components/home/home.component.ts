import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cardData = [];
  public newscategoryData = [];
  public newsTitle;
  public newsContent;
  public newsImage;
  public url;
  public newsCategory;
  public newsStartdate;
  public foodMenu;
  public foodDate;
  public days = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];
  public months = ["มกราคม","กุมภาพันธ์","มีนาคม", "เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน", "ตุลาคม","พฤศจิกายน","ธันวาคม"];
  public today = new Date();
  public album;
  public header;
 


  constructor(private http: HttpClient, private __appserverservice: AppserverService, private route: ActivatedRoute) {
    this.url = this.__appserverservice.baseUrl;
  }



  ngOnInit() {
    this.foodMenu = this.__appserverservice.foodmenu;
    this.sendNEWS();
    this.cardNEWS();
    this.menutDate();
    this.getGallery();
    this.getHeader();
  }


  //  รับข้อมูลข่าว
  private cardNEWS() {
    this.__appserverservice.getNews().subscribe(result => {
      console.log(result, "result");
      result.data.forEach(element => {
        let endDate = new Date(element.endDate)
        element.endDate = endDate;
      })
      this.cardData = result.data;
      console.log(this.cardData);

      var groups = new Set(result.data.map(data => data.category));
      groups.forEach(g => this.newscategoryData.push({
        name: g,
        values: result.data.filter(i => i.category === g)
      }));
      console.log(this.newscategoryData);

    });
  }

  public sendNEWS() {
    // this.route.data.subscribe(v => console.log(v));
    this.route.queryParams.subscribe(params => {
      const id = params['title'];
      const content = params['content'];
      const category = params['category'];
      const image = params['image'];
      console.log(id); // Print the parameter to the console.
      console.log(content);
      console.log(category);
      console.log(image);
    });
  }



  //ไปหน้าเนื้อหาข่าว
  public newscontent(titles, contents, categorys, images, startDates) {
    // window.open(`NEWSContent?title=${titles}&content=${contents}&category=${categorys}
    // &image=${images}&startDate=${startDates}`)
    this.newsTitle = titles;
    this.newsContent = contents;
    this.newsCategory = categorys;
    this.newsImage = images;
    this.newsStartdate = startDates;
  }

  openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  public menutDate() {
    this.foodDate = this.__appserverservice.foodMenuDate;
    var dd = this.foodDate.getDate();
    var day = this.days[this.foodDate.getDay()]
    var mm = this.months[this.foodDate.getMonth()];
    var yyyy = this.foodDate.getFullYear()+543;
    this.foodDate = "ประจำวัน"+ day + "ที่" + "  " + dd +"  " + mm + "  " + yyyy;
    // (<HTMLInputElement>document.getElementById('datefood')).value = this.foodDate;
    console.log(this.foodDate);
  }

  public getGallery() {
    fetch('../../../assets/json/gallery.json').then((res) => res.json())
    .then((data) => {
      this.album = data;
      console.log(this.album,"----album-----")
    })
  }

  public getHeader() {
    fetch('../../../assets/json/header.json').then((res) => res.json())
    .then((data) => {
      this.header = data;
      console.log(this.header)
    })
  }

  public test() {
    alert("Test")
  }

}
