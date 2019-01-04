import { Component, OnInit } from '@angular/core';
declare const App;
@Component({
  selector: 'app-chart',
  templateUrl: './sale-info.component.html',
  styleUrls: ['./sale-info.component.css']
})
export class SaleInfoComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    App.initLoadJquery();
  }
}
