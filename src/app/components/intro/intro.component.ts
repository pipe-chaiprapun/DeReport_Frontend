import { Component, OnInit } from '@angular/core';
import { Globals } from '../../models/globals';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(private globals: Globals) { }

  ngOnInit() {
    alert(this.globals.intro);
    this.globals.intro = false;
  }

  gotoHome() {
    
    
  }
}
