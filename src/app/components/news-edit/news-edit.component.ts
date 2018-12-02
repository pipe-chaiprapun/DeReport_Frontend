import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
declare const App;
declare const $;
@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  public newsCard = [];
  public title;
  private id;
  public content;
  public categoryName = [];
  public startDate;
  public endDate;
  public url;
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.initLoadUI();
    App.initLoadJquery();
  }

  initLoadUI() {
    this.url = this.resAPI.baseUrl;
    this.resAPI.getNews().subscribe(result => {
      this.newsCard = result.data;
      this.newsCard.forEach(element => {
        element.created_date = this.convertDateFormat(element.created_date);
        element.startDate = this.convertDateFormat(element.startDate);
        element.endDate = this.convertDateFormat(element.endDate);
      });
      console.log(this.newsCard);
    });
    this.resAPI.getCategory().subscribe(result => {
      this.categoryName = result.data;
      console.log(this.categoryName);
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

  convertDateFormat(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    let strDt = dt.toString();
    let strMonth = month.toString();
    if (dt < 10) {
      strDt = '0' + dt.toString();
    }
    if (month < 10) {
      strMonth = '0' + month;
    }
    return strDt + '/' + strMonth + '/' + year;
  }

  edit(data) {
    const div = data as HTMLElement;
    const start = document.getElementById('startDate') as HTMLInputElement;
    const end = document.getElementById('endDate') as HTMLInputElement;
    this.newsCard.forEach(element => {
      if (element._id === div.id) {
        this.id = div.id;
        this.title = element.title;
        this.content = element.content;
        this.startDate = element.startDate;
        this.endDate = element.endDate;
        start.value = this.startDate;
        end.value = this.endDate;
      }
    });
  }

  saveNews(title, content, cate, startDate, endDate, image) {
    const news = {
      id: this.id,
      title: title.value,
      content: content.value,
      category: cate.value,
      startDate: startDate.value.split('/').reverse().join('-'),
      endDate: endDate.value.split('/').reverse().join('-'),
      imageName: null,
      image: null,
      creator: 'admin'
    };
    if (image.files.length > 0) {
      this.newsCard.forEach(element => {
        if (element._id === this.id) {
          news.imageName = element.image;
        }
      });
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        news.image = myReader.result;
        this.resAPI.editNews(news).subscribe(result => {
          if (result.status === 'SUCCESS') {
            alert('บันทึกข้อมูลสำเร็จ');
            this.resAPI.getNews().subscribe(res => {
              this.newsCard = res.data;
              this.newsCard.forEach(element => {
                element.created_date = this.convertDateFormat(element.created_date);
                element.startDate = this.convertDateFormat(element.startDate);
                element.endDate = this.convertDateFormat(element.endDate);
              });
            });
          } else {
            alert('บันทึกข้อมูลไม่สำเร็จ! + ' + result.desc);
          }
        });
      };
      myReader.readAsDataURL(image.files[0]);
    } else {
      this.resAPI.editNews(news).subscribe(result => {
        console.log(result);
        if (result.status === 'SUCCESS') {
          alert('บันทึกข้อมูลสำเร็จ');
          this.resAPI.getNews().subscribe(res => {
            this.newsCard = res.data;
            this.newsCard.forEach(element => {
              element.created_date = this.convertDateFormat(element.created_date);
              element.startDate = this.convertDateFormat(element.startDate);
              element.endDate = this.convertDateFormat(element.endDate);
            });
          });
        } else {
          alert('บันทึกข้อมูลไม่สำเร็จ! + ' + result.desc);
        }
      });
    }
  }
  confirm(data) {
    const div = data as HTMLElement;
    this.newsCard.forEach(element => {
      if (element._id === div.id) {
        this.id = div.id;
        this.title = element.title;
        this.content = element.content;
        this.startDate = element.startDate;
        this.endDate = element.endDate;
      }
    });
  }
  delete() {
    const send = {
      id: this.id
    };
    this.resAPI.deleteNews(send).subscribe(result => {
      if (result.status = 'SUCCESS') {
        this.resAPI.getNews().subscribe(res => {
          this.newsCard = res.data;
        });
      }
    });
  }
}
