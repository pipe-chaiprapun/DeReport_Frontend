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


  constructor(private route: ActivatedRoute, private __appserverservice: AppserverService) { }

  url = this.__appserverservice.baseUrl;

  ngOnInit() {
    this.showContent();
    this.getContent();
    console.log(this.newsTitle,"Header : )")
  }


  public showContent() {
    this.route.queryParams.subscribe(params => {
      const id = params['title'];
      // const content = params['content'];
      // const category = params['category'];
      // const image = params['image'];
      // const startdate = params['startDate'];
      this.newsTitle = id;
    });
  }

  public getContent() {
    this.__appserverservice.getNews().subscribe((res) => {
      for(let i=0;i<res.data.length;i++) {
        console.log(i)
        if(res.data[i].title == this.newsTitle) {
          console.log(res.data[i]);
          this.newsContent = res.data[i].content;
          this.newsImage = res.data[i].image;
          this.newsCategory = res.data[i].category;
          this.newsStartdate = res.data[i].startDate;
        }
      }
    })
  }

}
