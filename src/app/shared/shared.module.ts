import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRouting } from '../app.routing';
import { ChartFilterComponent } from './components/chart-filter/chart-filter.component';

@NgModule({
  imports: [
    AppRouting,
    CommonModule,
    BsDropdownModule
  ],
  declarations: [NavbarComponent, SidebarComponent, ChartFilterComponent],
  exports: [
    NavbarComponent,
    SidebarComponent,
    BsDropdownModule,
    ChartFilterComponent
  ]
})
export class SharedModule { }
