import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IntroComponent } from './components/intro/intro.component';
import { SaleInfoComponent } from './components/sale-info/sale-info.component';
import { BranchComponent } from './components/branch/branch.component';

import { ChartJS } from './../assets/app/chartjs';
import { AppRouting } from './app.routing';
import { SummaryComponent } from './components/summary/summary.component';
import { SharedModule } from './shared/shared.module';
import { ExamChartComponent } from './components/exam-chart/exam-chart.component';
import { MonthlyMeetingComponent } from './components/monthly-meeting/monthly-meeting.component';
import { NewsManagementComponent } from './components/news-management/news-management.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { HomeComponent } from './components/home/home.component';
import 'hammerjs';
import { NgxGalleryModule } from 'ngx-gallery';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NewsContentComponent } from './components/news-content/news-content.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'intro', component: IntroComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'app', component: AppComponent },
//   { path: 'card', component: CardComponent },
//   { path: 'report', component: ReportComponent },
//   { path: 'chart', component: ChartComponent },
//   { path: 'login', component: LoginComponent }
// ];


@NgModule({
  declarations: [
    AppComponent,
    // MenuComponent,
    // HeaderComponent,
    // FooterComponent,
    LoginComponent,
    // HomeComponent,
    // CardComponent,
    IntroComponent,
    SaleInfoComponent,
    BranchComponent,
    SummaryComponent,
    ExamChartComponent,
    MonthlyMeetingComponent,
    NewsManagementComponent,
    NewsEditComponent,
    HomeComponent,
    ThumbnailComponent,
    GalleryComponent,
    NewsContentComponent

  ],
  imports: [
    AppRouting,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // RouterModule.forRoot(routes),
    SharedModule,
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
