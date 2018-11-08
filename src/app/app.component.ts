import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deweb';

  constructor() { }


  public get isIntro(): boolean {
    // if (sessionStorage.getItem("Intro") == "true" || sessionStorage.getItem("Intro") == null) {
    //   return false;
    // }
    return true;
  }
}
