import { Component, OnInit } from '@angular/core';
declare const App;
@Component({
  selector: 'app-monthly-meeting',
  templateUrl: './monthly-meeting.component.html',
  styleUrls: ['./monthly-meeting.component.css']
})
export class MonthlyMeetingComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    App.initLoadJquery();
  }
}
