import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild } from '@angular/core';
declare const App;
declare const $;


@Component({
  selector: 'app-food-management',
  templateUrl: './food-management.component.html',
  styleUrls: ['./food-management.component.css']
})
export class FoodManagementComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: any;

  public abc = this.__Appserver.foodmenu;
  fileToUpload: File = null;
  public menuFiles = [];
  sMsg: string = '';
  nameMenu;
  detail;


  constructor(private http: HttpClient, private __Appserver: AppserverService) { }



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

  getFileDetails(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      let menuDetail = {};
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      
      var self = this;
      // Closure to capture the file information.
      reader.onloadend = (function (theFile) {
        return function (e) {
          menuDetail['img'] = e.target.result;
          menuDetail['name'] = theFile.name.replace(/\.[^/.]+$/, "");
          self.menuFiles.push(menuDetail);
          console.log(menuDetail);
          this.detail = document.createElement('container');
          this.detail.innerHTML = ['<div class="row"><div class="col-md-6 col-xs-12"><div class="card" style="width: 18rem;"><img class="card-img-top" src="', e.target.result,
            '" title="', escape(theFile.name), '"/><div class="card-body"> <h5 class="card-title">', theFile.name.replace(/\.[^/.]+$/, ""), '</h5></div></div></div></div>'].join('');
          document.getElementById('list').insertBefore(this.detail, null);
        };
      })(f);
      
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);

    }
    console.log(this.menuFiles);
  }

  clearFileDetail() {
    alert("aaaa");
    const uploadIMG = document.getElementById('files') as HTMLInputElement;
    var form = document.getElementById('fileform');
    document.getElementById('list').innerHTML = null;
    uploadIMG.value = null;
    this.detail = "";
    console.log(this.detail)
  }

  reset() {
    alert("clear!!!")
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
  }


  uploadFiles() {
    console.log(this.menuFiles)

  }

}
