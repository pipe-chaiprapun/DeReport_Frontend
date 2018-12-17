import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRouting } from '../app.routing';
import { SaleComponent } from './components/sale/sale.component';

@NgModule({
  imports: [
    AppRouting,
    CommonModule,
    BsDropdownModule
  ],
  declarations: [NavbarComponent, SidebarComponent, SaleComponent],
  exports: [
    NavbarComponent,
    SidebarComponent,
    BsDropdownModule,
    SaleComponent
  ]
})
export class SharedModule { }
