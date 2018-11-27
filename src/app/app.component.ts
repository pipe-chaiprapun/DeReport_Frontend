import { Component, OnInit } from '@angular/core';
declare const App: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'deweb';

  ngOnInit() {
    App.initLoadJquery();
  }


  public get isIntro(): boolean {
    // if (sessionStorage.getItem("Intro") == "true" || sessionStorage.getItem("Intro") == null) {
    //   return false;
    // }
    return true;
  }
}
