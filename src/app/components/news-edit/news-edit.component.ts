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
  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    this.resAPI.getNews().subscribe(result => {
      this.newsCard = result.data;
    });
    this.resAPI.getCategory().subscribe(result => {
      this.categoryName = result.data;
      console.log(this.categoryName);
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

  edit(data) {
    const div = data as HTMLElement;
    this.newsCard.forEach(element => {
      if (element._id === div.id) {
        this.title = element.title;
        this.content = element.content;
        this.startDate = element.startDate;
        this.endDate = element.endDate;
      }
    });
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
    // const div = data as HTMLElement;
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
