import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  branchs:any = [];

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
  }

  onSubmit(value) {
    this.resAPI.getBranch(value).subscribe(result => {
      this.branchs = JSON.parse(JSON.stringify(result).replace(/"([^"]+)":/g, function($0,$1){return ('"'+$1.toLowerCase()+'":');}));
      console.log(result);
    })
  }

}
