import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserverService } from '../../services/appserver.service';
import { VgAPI, VgFullscreenAPI } from 'videogular2/core';
import { ChangeDetectorRef } from "@angular/core";
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

  //test
  sources: Array<Object>;
  controls: boolean = false;
  autoplay: boolean = false;
  loop: boolean = false;
  preload: string = 'auto';
  api: VgAPI;
  fsAPI: VgFullscreenAPI;
  nativeFs: boolean = true;

  constructor(private route: ActivatedRoute, private __appserverservice: AppserverService,private cdRef:ChangeDetectorRef) {

    this.__appserverservice.getTrainning().subscribe((res) => {
      for (var i = 0; i < res.data.length; i++) {
        for (var j = 0; j < res.data[i].videos.length; j++) {
          if (this.videoName == res.data[i].videos[j].name) {
            this.clipPath = res.data[i].videos[j].path;
            this.clipName = res.data[i].videos[j].name
            this.category = res.data[i].category;
            this.mainDetail = res.data[i].detail;
            this.mainPoster = res.data[i].poster;
            this.Instructor = res.data[i].Instructor;
            this.clipDetail = res.data[i].videos[j].detail;
            this.clipPoster = res.data[i].videos[j].poster;
            this.clipPath = res.data[i].videos[j].path;
            this.clipForward = res.data[i].videos[(j + 1)];
            this.orderData = i;
            this.orderVideos = j;
            console.log(i, j, "ORDER I and J")
            console.log(this.category);
            console.log(this.mainDetail);
            console.log(this.mainPoster);
            console.log(this.Instructor);
            console.log(this.clipDetail);
            console.log(this.clipPoster);
            console.log(this.clipPath);
            this.sources = [
              {
                src: res.data[i].videos[j].path,
                type: "video/mp4",
                poster: res.data[i].videos[j].poster
              }
            ];
            if (res.data[i].videos[(j + 1)] == void 0) {
              $('#forward').hide();
            } else if (res.data[i].videos[(j - 1)] == void 0) {
              $('#backward').hide();
            }
          }
        }
      }
    })
  }
  url = this.__appserverservice.baseUrl;

  ngOnInit() {
    this.getContent();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  public getContent() {
    this.route.queryParams.subscribe(params => {
      const nameVDO = params['name'];
      this.videoName = nameVDO;
      // this.contentData();
    })
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.fsAPI = this.api.fsAPI;
    this.nativeFs = this.fsAPI.nativeFullscreen;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        this.api.getDefaultMedia().currentTime = 0;
      }
    );
  }

  onChangeNativeFs($event) {
    this.fsAPI.nativeFullscreen = this.nativeFs;
    console.log('onChangeNativeFs', this.fsAPI.nativeFullscreen, this.nativeFs);
  }

  onClickUpdateSource() {
    this.sources = [
      {
        src: "http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov",
        type: "video/mp4"
      },
      {
        src: "http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg",
        type: "video/ogg"
      }
    ];
  }

  // public contentData() {
  //   this.__appserverservice.getTrainning().subscribe((res) => {
  //     console.log(res.data)
  //     console.log(res.data.length);
  //     for(var i=0; i < res.data.length; i++) {
  //       for(var j=0; j < res.data[i].videos.length; j++) {
  //         console.log(res.data[i].videos[j].name, "ชื่อวีดีโอ")
  //         if( this.videoName == res.data[i].videos[j].name) {
  //           console.log(res.data[i].videos[j], "เจอแล้วจ้า")
  //           this.clipName =  res.data[i].videos[j].name
  //           this.category =   res.data[i].category;
  //           this.mainDetail = res.data[i].detail;
  //           this.mainPoster = res.data[i].poster;
  //           this.Instructor = res.data[i].Instructor;
  //           this.clipDetail = res.data[i].videos[j].detail;
  //           this.clipPoster = res.data[i].videos[j].poster;
  //           this.clipPath = res.data[i].videos[j].path;
  //           this.clipForward = res.data[i].videos[(j+1)];
  //           this.orderData = i;
  //           this.orderVideos = j;
  //           console.log(i,j,"ORDER I and J")
  //           console.log(this.category);
  //           console.log(this.mainDetail);
  //           console.log(this.mainPoster);
  //           console.log(this.Instructor);
  //           console.log(this.clipDetail);
  //           console.log(this.clipPoster);
  //           console.log(this.clipPath);
  //         }
  //       }
  //     }
  //   })
  // }

  public Forward() {
    this.clipName = null;
    this.clipDetail = null;
    this.clipPoster = null;
    this.clipPath = null;
    this.orderVideos++;
    this.__appserverservice.getTrainning().subscribe((res) => {
      console.log(res.data[this.orderData].videos[this.orderVideos], "ข้อมูลสำหรับหน้าถัดไปหรือก่อนหน้า")
      if (res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos + 1)] !== void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;
        this.sources = [
          {
            src: res.data[this.orderData].videos[this.orderVideos].path,
            type: "video/mp4",
          }
        ];
        $('#backward').show();

      } else if (res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos + 1)] == void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;
        this.sources = [
          {
            src: res.data[this.orderData].videos[this.orderVideos].path,
            type: "video/mp4",
          }
        ];
        $('#forward').hide();
        $('#backward').show();
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
      console.log(res.data[this.orderData].videos[this.orderVideos], "ข้อมูลสำหรับหน้าถัดไปหรือก่อนหน้า")
      if (res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos - 1)] !== void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;
        this.sources = [
          {
            src: res.data[this.orderData].videos[this.orderVideos].path,
            type: "video/mp4",
          }
        ];
        $('#forward').show();

      } else if (res.data[this.orderData].videos[this.orderVideos] !== void 0 && res.data[this.orderData].videos[(this.orderVideos - 1)] == void 0) {

        this.clipName = res.data[this.orderData].videos[this.orderVideos].name;
        this.clipDetail = res.data[this.orderData].videos[this.orderVideos].detail;
        this.clipPoster = res.data[this.orderData].videos[this.orderVideos].poster;
        this.clipPath = res.data[this.orderData].videos[this.orderVideos].path;
        this.sources = [
          {
            src: res.data[this.orderData].videos[this.orderVideos].path,
            type: "video/mp4",
          }
        ];
        $('#forward').show();
        $('#backward').hide();
      }
    })
  }

}
