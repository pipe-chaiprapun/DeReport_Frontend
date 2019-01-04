import { Component, OnInit } from '@angular/core';
import { AppUrl } from 'src/app/app.url';

@Component({
  selector: 'app-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.css']
})
export class SidebarMobileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Url = AppUrl;
}
