import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserverService } from '../../services/appserver.service';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {
  public newsTitle;
  public newsContent;
  public newsCategory;
  public newsImage;
  public newsStartdate;

  constructor(private route: ActivatedRoute,private __appserverservice: AppserverService) { }

  url = this.__appserverservice.baseUrl;

  ngOnInit() {
    this.showContent();
  }


  public showContent() {
    this.route.queryParams.subscribe(params => {
      const id = params['title'];
      const content = params['content'];
      const category = params['category'];
      const image = params['image'];
      const startdate= params['startDate'];
      this.newsTitle = id;
      this.newsContent = content;
      this.newsImage = image;
      this.newsCategory = category;
      this.newsStartdate = startdate;
    });
  }

}
