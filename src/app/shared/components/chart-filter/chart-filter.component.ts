import { Component, OnInit } from '@angular/core';
declare const App;
declare const $;
@Component({
  selector: 'app-chart-filter',
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.css']
})
export class ChartFilterComponent implements OnInit {

  constructor() { }
  public sort = ['สายบริการ', 'เป้าการขาย', 'ยอดขาย', 'ยอดเก็บ', 'ขาด/เกิน', 'PDO เพิ่ม/ลด'];
  public path = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];

  ngOnInit() {
    $('#startDate').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    }).on('show', function (e) {
      $('#chart-filter').css('opacity', '1');
      console.log('show');
    });
    $('#endDate').datepicker({
      format: 'mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startView: 'months',
      minViewMode: 'months'
    });
  }

}
