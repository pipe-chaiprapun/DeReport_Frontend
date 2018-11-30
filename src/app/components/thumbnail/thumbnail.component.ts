import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
declare const App;
declare const $;
@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  private image64 = [];
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
  }

  confirm(image) {
    console.log(image.files);
    this.image64 = [];
    for (const e of image.files) {
      this.getBase64(e).then((res) => {
        this.image64.push(res);
      });
    }
    // const data = {
    //   name: 'Thumbnail',
    //   image: images
    // };
    // console.log(data);
    // this.resAPI.addImgThumbnail(data).subscribe(result => {
    //   if (result.status === 'SUCCESS') {
    //     alert('บันทึกข้อมูลสำเร็จ');
    //   } else {
    //     alert('บันทึกข้อมูลไม่สำเร็จ! + ' + result.desc);
    //   }
    // });
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
