import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { GalleryService } from '../../services/gallery.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'hammerjs';
declare const App;
declare const $;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public url;
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

  constructor(private http: HttpClient, private __appserverservice: AppserverService, private __galleryservice: GalleryService, ) { 
     this.url = this.__appserverservice.baseUrl; 
  }

  ngOnInit() {
    App.initLoadJquery();
    this.gallery();
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
  }

}
