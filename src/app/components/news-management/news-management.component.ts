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
  public categoryName = [];
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.resAPI.getCategory().subscribe(result => {
      result.data.forEach(element => {
        this.categoryName.push(element.name);
      });
    });
    App.initLoadJquery();
    $('#startDate').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      todayHighlight: true
    });
    $('#endDate').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      todayHighlight: true
    });
  }
  saveNews(title, content, cate, startDate, endDate, image) {
    console.log(title.value);
    console.log(content.value);
    console.log(cate.value);
    console.log(startDate.value);
    console.log(endDate.value);
    console.log(image.files[0]);
    const news = {
      title: title.value,
      content: content.value,
      category: cate.value,
      startDate: startDate.value,
      endDate: endDate.value,
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
    const startDate = document.getElementById('startDate') as HTMLInputElement;
    const endDate = document.getElementById('endDate') as HTMLInputElement;
    title.value = null;
    content.value = null;
    image.value = null;
    startDate.value = null;
    endDate.value = null;
  }
}
