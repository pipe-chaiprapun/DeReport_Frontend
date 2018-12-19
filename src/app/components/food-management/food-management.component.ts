import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
declare const $;


@Component({
  selector: 'app-food-management',
  templateUrl: './food-management.component.html',
  styleUrls: ['./food-management.component.css']
})
export class FoodManagementComponent implements OnInit {


  public abc = this.__Appserver.foodmenu;
  public fileToUpload: File = null;
  public menuFiles = [];
  public sMsg = '';
  public detail: any;
  public datepicker;
  public days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  // tslint:disable-next-line:max-line-length
  public months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

  constructor(private __Appserver: AppserverService) { }



  ngOnInit() {
    this.menudate();
    this.menuDateChange();
  }



  private menuDateChange() {
    $.fn.datepicker.dates['en'] = {
      days: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
      daysShort: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
      daysMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
      // tslint:disable-next-line:max-line-length
      months: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      monthsShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
      today: 'วันนี้',
      clear: 'Clear',
      format: 'ประจำวัน DD ที่ dd MM yyyy',
      titleFormat: 'MM yyyy', /* Leverages same syntax as 'format' */
      weekStart: 0
  };
    $('#startDate').datepicker({
      language: 'en',
      autoclose: true,
      todayHighlight: true
    });
  }

  private menudate() {
    this.datepicker = this.__Appserver.foodMenuDate;
    const dd = this.datepicker.getDate();
    const day = this.days[this.datepicker.getDay()];
    const mm = this.months[this.datepicker.getMonth()];
    const yyyy = this.datepicker.getFullYear();
    this.datepicker = 'ประจำวัน' + ' ' + day + ' ที่' + '  ' + dd + '  ' + mm + '  ' + yyyy;
    (<HTMLInputElement>document.getElementById('startDate')).value = this.datepicker;
  }

  getFileDetails(evt) {
    const files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {
      const menuDetail = {};
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      const reader = new FileReader();


      const self = this;
      // Closure to capture the file information.
      reader.onloadend = (function (theFile) {
        return function (e) {
          menuDetail['img'] = e.target.result;
          menuDetail['name'] = theFile.name.replace(/\.[^/.]+$/, '');
          self.menuFiles.push(menuDetail);
          console.log(menuDetail);
          this.detail = document.createElement('div');
          this.detail.className = 'col-md-4 col-xs-6';
          // tslint:disable-next-line:max-line-length
          this.detail.innerHTML = ['<div class="card ml-4 mt-3" style="width: 18rem;"><img style="height: 220px;" class="card-img-top" src="', e.target.result,
            // tslint:disable-next-line:max-line-length
            '" title="', escape(theFile.name), '"/><div class="card-body" style="text-align: center;"> <h5 class="card-title">', theFile.name.replace(/\.[^/.]+$/, ''), '</h5></div></div>'].join('');
          document.getElementById('list').insertBefore(this.detail, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);

    }
    console.log(this.menuFiles);
  }

  clearFileDetail() {
    this.menuFiles = [];
    alert('aaaa');
    const uploadIMG = document.getElementById('files') as HTMLInputElement;
    const ltstFood = document.getElementById('list');
    const form1 = document.getElementById('fileform');
    ltstFood.innerHTML = null;
    uploadIMG.value = null;
    console.log(this.detail);
  }




  uploadFiles() {
    console.log(this.menuFiles);

  }

}
