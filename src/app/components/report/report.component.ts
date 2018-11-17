import { Component, OnInit } from '@angular/core';
import { AppserverService } from '../../services/appserver.service';
declare const App: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  branchs:any = [];

  constructor(private resAPI: AppserverService) { }

  ngOnInit() {
    App.initLoadJquery();
  }

  onSubmit(value) {
    this.resAPI.getBranch(value.brh_id).subscribe(result => {
      this.branchs = JSON.parse(JSON.stringify(result.data).replace(/"([^"]+)":/g, function($0,$1){return ('"'+$1.toLowerCase()+'":');}));
      console.log(result);
    })
  }

}
