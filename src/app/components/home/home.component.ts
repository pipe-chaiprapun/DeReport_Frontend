import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { GalleryService } from '../../services/gallery.service';
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
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  pmdayOption: NgxGalleryOptions[];
  pmdayImage: NgxGalleryImage[];
  footballOption: NgxGalleryOptions[];
  footballImage: NgxGalleryImage[];
  sportOption: NgxGalleryOptions[];
  sportImage: NgxGalleryImage[];
  misOption: NgxGalleryOptions[];
  misImage: NgxGalleryImage[];
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

 


  constructor(private http: HttpClient, private __appserverservice: AppserverService,
    private __galleryservice: GalleryService, private route: ActivatedRoute) {
    this.url = this.__appserverservice.baseUrl;
  }



  ngOnInit() {
    this.sendNEWS();
    this.cardNEWS();
    this.gallery();
    this.menutDate();
    console.log("-----------foodDate2------------");
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

  public gallery() {
    //Main
    this.galleryOptions = this.__galleryservice.mainOptions;
    this.galleryImages = this.__galleryservice.mainImages;

    //PMDay
    this.pmdayOption = this.__galleryservice.bdpmOptions;
    this.pmdayImage = this.__galleryservice.bdpmImages;

    //แข่งขันฟุตบอลเสียงตามสาย
    this.footballOption = this.__galleryservice.footballOptions;
    this.footballImage = this.__galleryservice.footballImages;

    //แข่งขันฟุตบอลเสียงตามสาย
    this.sportOption = this.__galleryservice.spOptions;
    this.sportImage = this.__galleryservice.spImages;

    this.misOption = this.__galleryservice.abcOption;
    this.misImage = this.__galleryservice.abcImage;
    this.foodMenu = this.__appserverservice.foodmenu;
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


}
