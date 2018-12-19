import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  goHome() {
    alert('before' + sessionStorage.getItem('Intro'));
    sessionStorage.setItem('Intro', 'true');
    alert('after' + sessionStorage.getItem('Intro'));
  }
}
