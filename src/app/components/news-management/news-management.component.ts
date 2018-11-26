import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppserverService } from '../../services/appserver.service';
declare const App;
declare const $;
@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.css']
})
export class NewsManagementComponent implements OnInit {
  imagePath = null;
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
  }
  saveNews(title, content, image) {
    console.log(title.value);
    console.log(content.value);
    console.log(image.files[0]);
    const news = {
      title: title.value,
      content: content.value,
      image: image.value,
      creator: 'admin'
    };
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      news.image = myReader.result;
      this.resAPI.addNews(news).subscribe(result => {
        console.log(result);
        if (result.status === 'SUCCESS') {
          alert('บันทึกข้อมูลสำเร็จ');
        } else {
          alert('บันทึกข้อมูลไม่สำเร็จ! + ' + result.desc);
        }
      });
    };
    myReader.readAsDataURL(image.files[0]);
  }
  clearNews() {
    const title = document.getElementById('title') as HTMLInputElement;
    const content = document.getElementById('content') as HTMLInputElement;
    const image = document.getElementById('image') as HTMLInputElement;
    title.value = null;
    content.value = null;
    image.value = null;
  }
}
