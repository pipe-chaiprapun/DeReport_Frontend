import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { IntroComponent } from './components/intro/intro.component';
import { ChartComponent } from './components/chart/chart.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'app', component: AppComponent },
  { path: 'card', component: CardComponent },
  { path: 'report', component: ReportComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    IntroComponent,
    ChartComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
