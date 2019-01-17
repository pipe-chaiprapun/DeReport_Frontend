import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { GalleryService } from '../../services/gallery.service';
import 'hammerjs';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
declare const App;
declare const $;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public url;
  public albums;
  public imgAlbum;
  public nameAlbum;
  public galleryFiles = [];
  public galleryUpload = {};
  public detail: any;
  public imgpath;
  public optionGallery = [
    {
      "image": false,
      "thumbnailsRemainingCount": true,
      "height": "212px",
      "thumbnailsColumns": 1,
      "previewfullWidth": true,
      "width": "100%"
    },
    {
      "breakpoint": 500,
      "width": "50%",
      "thumbnailsColumns": 1
    }
  ]
  public needdle = 'อบรมโปรแกรมเจ้าหน้าใหม่ฝ่ายตลาด'
  public nameGal;
  public detailGal;
  public dateGal;
  public files: File[];
  public uploader: FileUploader = new FileUploader({ url: 'http://10.192.192.10:8042/api/gallery/addAlbum' });



  constructor(private __appserverservice: AppserverService, private __galleryservice: GalleryService, private http: HttpClient) {
    this.url = this.__appserverservice.baseUrl;

    this.__appserverservice.getGallery().subscribe((res) => {
      let data = res.data;


      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      this.albums = groupBy(data, 'name')
      console.log(this.albums, 'ทดสอบบบบบ รับค่าไฟล์');

    });
  }

  ngOnInit() {
    $('#อัลบั้ม').hide();
    $('#backMain').hide();
    $('.albumName').hide();

    App.initLoadJquery();
    this.get();

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('name', this.nameGal);
      form.append('detail', this.detailGal);
      form.append('date', this.dateGal);
    };
  }

  public galleryDetail() {
    $('#main').hide();
    $('#addAlbum').hide();
    $('#อัลบั้ม').show();
    $('#backMain').show();
    $('.albumName').show();
    $('#galleryName').hide();
  }

  public getvalue(key, name) {
    this.imgAlbum = this.albums[key];
    this.nameAlbum = name;
    console.log(this.imgAlbum, this.nameAlbum, 'test');
  }

  public deleteAlbum(namegal) {
    let confirmRemove = confirm('ยืนยันการลบ???');
    var json = { name: namegal }
    if (confirmRemove == true) {
      console.log(json)
      this.__appserverservice.removeGallery(json).subscribe((res) => {
        location.reload();
      })
    } else {
      alert("no")
    }
  }

  public backtomain() {
    this.imgAlbum = null;
    this.nameAlbum = null;
    $('#อัลบั้ม').hide();
    $('#backMain').hide();
    $('#main').show();
    $('#addAlbum').show();
    $('.albumName').hide();
    $('#galleryName').show();
  }

  public clearFileDetail() {
    // this.nameGal = null;
    // this.detailGal = null;
    // this.dateGal = null;
    // this.galleryFiles = [];
    // const uploadIMG = document.getElementById('files') as HTMLInputElement;
    // const ltstFood = document.getElementById('name');
    // ltstFood.innerHTML = null;
    // uploadIMG.value = null;
    // console.log(this.detail);
  }

  public getimg(val, val2) {
    console.log(val);
    this.imgpath = this.url + "/pics/" + "/" + val2 + "/" + val;
    $('.imagepreview').attr('src', this.imgpath);
    $('#imagemodal').modal('show');
  }

  public clearimgpreview() {
    this.imgpath = null;
    $('.imagepreview').attr('src', this.imgpath);
  }

  public get() {
    console.log("test!@")
    this.__appserverservice.getGallery().subscribe((res) => {
      for (var i = 0; i < res.length; i++) {
        console.log(i)
        if (res[i].name == this.needdle) {
          console.log(res[i], "อบรมโปรแกรมเจ้าหน้าใหม่ฝ่ายตลาด????!");
        }
      }
    })
  }

  public form() {
    alert('1234')
    this.nameGal = $('#name').val();
    this.detailGal = $('#detail').val();
    this.dateGal = $('#date').val();
    console.log(this.nameGal, "AAAA")
    console.log(this.detailGal, "BBB")
    console.log(this.dateGal, "CCC")
  }

  public removePic(id, name, filename) {
    let dataFile = { _id: id, name: name, filename: filename }
    console.log(id)
    this.__appserverservice.removePic(dataFile).subscribe((res) => {
    })
  }


}