import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { GalleryService } from '../../services/gallery.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


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
  public cardData = [];
  public newscategoryData = [];



  constructor(private http: HttpClient, private __appserverservice: AppserverService, private __galleryservice: GalleryService) { }

  url = this.__appserverservice.baseUrl;


  ngOnInit() {
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
  }

  //  รับข้อมูลข่าว
  private cardNEWS() {
    this.__appserverservice.getNews().subscribe(result => {
      console.log(result,"result");
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
  public newscontent(titles,contents,categorys,images,startDates) {
    window.open(`NEWSContent?title=${titles}&content=${contents}&category=${categorys}
    &image=${images}&startDate=${startDates}`)
  }




}
