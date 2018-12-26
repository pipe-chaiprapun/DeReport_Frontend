import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserverService } from '../../services/appserver.service';
declare const App;
declare const $;

@Component({
  selector: 'app-trainning-content',
  templateUrl: './trainning-content.component.html',
  styleUrls: ['./trainning-content.component.css']
})
export class TrainningContentComponent implements OnInit {
  public videoName;
  public category;
  public mainDetail;
  public mainPoster;
  public Instructor;
  public clipDetail;
  public clipPoster;
  public clipPath;
  public clipForward;
  public clipName;
  public orderData: number;
  public orderVideos: number;

  constructor(private route: ActivatedRoute, private __appserverservice: AppserverService) { }
  url = this.__appserverservice.baseUrl;

  ngOnInit() {
    this.getContent();
  }

  public getContent() {
    this.route.queryParams.subscribe(params => {
      const nameVDO = params['name'];
      this.videoName = nameVDO;
      this.contentData();
    })
  }

  public contentData() {
    this.__appserverservice.getTrainning().subscribe((res) => {
      console.log(res.data)
      console.log(res.data.length);
      for(var i=0; i < res.data.length; i++) {
        for(var j=0; j < res.data[i].videos.length; j++) {
          console.log(res.data[i].videos[j].name, "ชื่อวีดีโอ")
          if( this.videoName == res.data[i].videos[j].name) {
            console.log(res.data[i].videos[j], "เจอแล้วจ้า")
            this.clipName =  res.data[i].videos[j].name
            this.category =   res.data[i].category;
            this.mainDetail = res.data[i].detail;
            this.mainPoster = res.data[i].poster;
            this.Instructor = res.data[i].Instructor;
            this.clipDetail = res.data[i].videos[j].detail;
            this.clipPoster = res.data[i].videos[j].poster;
            this.clipPath = res.data[i].videos[j].path;
            this.clipForward = res.data[i].videos[(j+1)];
            this.orderData = i;
            this.orderVideos = j;
            console.log(i,j,"ORDER I and J")
            console.log(this.category);
            console.log(this.mainDetail);
            console.log(this.mainPoster);
            console.log(this.Instructor);
            console.log(this.clipDetail);
            console.log(this.clipPoster);
            console.log(this.clipPath);
          }
        }
      }
    })
  }

  public Forward() {
    this.clipName = null;
    this.clipDetail = null;
    this.clipPoster = null;
    this.clipPath = null;
    this.orderVideos++;
    this.__appserverservice.getTrainning().subscribe((res) => {
      console.log(res.data[this.orderData].videos[this.orderVideos],"ข้อมูลสำหรับหน้าถัดไปหรือก่อนหน้า")
      if(res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos+1)] !== void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;

      } else if (res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos+1)] == void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;

      }
    })
  }

  public Backward() {
    this.clipName = null;
    this.clipDetail = null;
    this.clipPoster = null;
    this.clipPath = null;
    this.orderVideos--;
    this.__appserverservice.getTrainning().subscribe((res) => {
      console.log(res.data[this.orderData].videos[this.orderVideos],"ข้อมูลสำหรับหน้าถัดไปหรือก่อนหน้า")
      if(res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos-1)] !== void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;

      } else if (res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos-1)] == void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;

      }
    })
  }

  

}
