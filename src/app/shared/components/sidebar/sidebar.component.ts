import { Component, OnInit } from '@angular/core';
import { AppUrl } from 'src/app/app.url';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }
  Url = AppUrl;
}
