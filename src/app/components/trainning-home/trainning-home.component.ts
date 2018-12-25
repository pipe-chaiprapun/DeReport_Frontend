import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
import 'hammerjs';

@Component({
  selector: 'app-trainning-home',
  templateUrl: './trainning-home.component.html',
  styleUrls: ['./trainning-home.component.css']
})
export class TrainningHomeComponent implements OnInit {
  public trainngData;

  constructor(private __appserverservice: AppserverService) { }

  ngOnInit() {
    this.getTrainning();
  }

  public getTrainning() {
    this.__appserverservice.getTrainning().subscribe((res) => {
      this.trainngData = res.data;
      console.log(this.trainngData,"+++Trainning+++")
    })
  }

}
