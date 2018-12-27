import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
declare const App;
declare const $;

@Component({
  selector: 'app-trainning-management',
  templateUrl: './trainning-management.component.html',
  styleUrls: ['./trainning-management.component.css']
})
export class TrainningManagementComponent implements OnInit {
  public dataTrainning;

  constructor(private __appserverservice: AppserverService) { 
    this.__appserverservice.getTrainning().subscribe((res) =>{
      this.dataTrainning = res.data;
      console.log(this.dataTrainning,"ข้อมูลสื่อการสอน");
    })
  }

  ngOnInit() {
  }

}
