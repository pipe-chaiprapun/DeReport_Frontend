import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BsDropdownModule } from 'ngx-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRouting } from '../app.routing';
import { SaleComponent } from './components/sale/sale.component';
import { SalePathComponent } from './components/sale-path/sale-path.component';
import { MonthlyReportComponent } from './components/monthly-report/monthly-report.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { SidebarMobileComponent } from './components/sidebar-mobile/sidebar-mobile.component';

@NgModule({
  imports: [
    AppRouting,
    CommonModule
    // BsDropdownModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [NavbarComponent, SidebarComponent, SaleComponent, SalePathComponent, MonthlyReportComponent,
    NavbarMobileComponent, SidebarMobileComponent],
  exports: [
    NavbarComponent,
    SidebarComponent,
    // BsDropdownModule,
    SaleComponent,
    SalePathComponent,
    MonthlyReportComponent,
    NavbarMobileComponent,
    SidebarMobileComponent
  ]
})
export class SharedModule { }
