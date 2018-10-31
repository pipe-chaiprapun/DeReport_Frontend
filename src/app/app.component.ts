import { Component } from '@angular/core';
import { Globals } from './models/globals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deweb';

  constructor(private globals: Globals) { }


  public get isIntro(): boolean {
    if (sessionStorage.getItem("Intro") == "true" || sessionStorage.getItem("Intro") == null) {
      
      return false;
    }
    // if (this.globals.intro == true) {
    //   return false;
    // }
    return true;
  }
}
