import { Component, OnInit } from '@angular/core';
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
    this.initLoadUI();
    App.initLoadJquery();
  }

  initLoadUI() {
    this.resAPI.getCategory().subscribe(result => {
      result.data.forEach(element => {
        this.categoryName.push(element.name);
      });
    });
    $('#startDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true
    });
    $('#endDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true
    });
  }

  saveNews(title, content, cate, startDate, endDate, image) {
    const news = {
      title: title.value,
      content: content.value,
      category: cate.value,
      startDate: startDate.value.split('/').reverse().join('-'),
      endDate: endDate.value.split('/').reverse().join('-'),
      image: image.value,
      creator: 'admin'
    };
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      console.log(e)
      news.image = myReader.result;
      console.log(news.image,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      this.resAPI.addNews(news).subscribe(result => {
        console.log(result);
        if (result.status === 'SUCCESS') {
          alert('บันทึกข้อมูลสำเร็จ');
          this.clearNews();
        } else {
          alert('บันทึกข้อมูลไม่สำเร็จ! + ' + result.desc);
        }
      });
    };
    myReader.readAsDataURL(image.files[0]);
    console.log(image.files[0])
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
