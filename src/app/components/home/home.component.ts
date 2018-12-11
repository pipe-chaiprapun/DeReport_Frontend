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
  abcOption: NgxGalleryOptions[];
  abcImage: NgxGalleryImage[];
  public cardData = [];
  public newscategoryData = [];
  public newsTitle;
  public newsContent;
  public newsImage;
  public url;
  public newsCategory;
  public newsStartdate;
  public foodMenu;


  today = new Date();


  constructor(private http: HttpClient, private __appserverservice: AppserverService,
    private __galleryservice: GalleryService, private route: ActivatedRoute) {
    this.url = this.__appserverservice.baseUrl;
  }



  ngOnInit() {
    console.log(this.today)
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
    this.cardNEWS();

    //Main
    this.galleryOptions = this.__galleryservice.mainOptions;
    this.galleryImages = this.__galleryservice.mainImages;
    //endMain

    //PMDay
    this.pmdayOption = this.__galleryservice.bdpmOptions;
    this.pmdayImage = this.__galleryservice.bdpmImages;
    //endPMDay

    //แข่งขันฟุตบอลเสียงตามสาย
    this.footballOption = this.__galleryservice.footballOptions;
    this.footballImage = this.__galleryservice.footballImages;
    //end

    //แข่งขันฟุตบอลเสียงตามสาย
    this.sportOption = this.__galleryservice.spOptions;
    this.sportImage = this.__galleryservice.spImages;
    //end

    this.abcOption = this.__galleryservice.abcOption;
    this.abcImage = this.__galleryservice.abcImage;

    this.foodMenu = this.__appserverservice.foodmenu;
  }

  //  รับข้อมูลข่าว
  private cardNEWS() {
    this.__appserverservice.getNews().subscribe(result => {
      console.log(result, "result");
      console.log(this.today);
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


}
