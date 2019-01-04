import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import 'hammerjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainning-home',
  templateUrl: './trainning-home.component.html',
  styleUrls: ['./trainning-home.component.css']
})
export class TrainningHomeComponent implements OnInit {
  public trainngData;
  public url = this.__appserverservice.baseUrl;

  constructor(private route: ActivatedRoute,private __appserverservice: AppserverService) { }

  ngOnInit() {
    this.getTrainning();
  }

  public getTrainning() {
    this.__appserverservice.getTrainning().subscribe((res) => {
      this.trainngData = res.data;
      console.log(this.trainngData,"+++Trainning+++")
    })
  }

  public openContent(val) {
    console.log(val,"value of video");
    window.open(`trainningContent?name=${val}`)
  }

}
