import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
// import { IntroComponent } from './components/intro/intro.component';
import { SaleInfoComponent } from './components/sale-info/sale-info.component';

import { AppRouting } from './app.routing';
import { SummaryComponent } from './components/summary/summary.component';
import { SharedModule } from './shared/shared.module';
// import { ExamChartComponent } from './components/exam-chart/exam-chart.component';
import { MonthlyMeetingComponent } from './components/monthly-meeting/monthly-meeting.component';
import { NewsManagementComponent } from './components/news-management/news-management.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { HomeComponent } from './components/home/home.component';
import 'hammerjs';
import { NgxGalleryModule } from 'ngx-gallery';
// import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NewsContentComponent } from './components/news-content/news-content.component';
import { FoodManagementComponent } from './components/food-management/food-management.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { TrainningHomeComponent } from './components/trainning-home/trainning-home.component';
import { TrainningContentComponent } from './components/trainning-content/trainning-content.component';
import { TrainningManagementComponent } from './components/trainning-management/trainning-management.component';
import { TestSignalrComponent } from './components/test-signalr/test-signalr.component';
import { MobileAppComponent } from './mobile-app/mobile-app.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { ContractComponent } from './components/contract/contract.component';
import { ContractPaymentComponent } from './components/contract-payment/contract-payment.component';
import { TargetReportComponent } from './components/target-report/target-report.component';
import { PayReportComponent } from './components/pay-report/pay-report.component';
import { BanksComponent } from './components/banks/banks.component';


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
    // IntroComponent,
    SaleInfoComponent,
    SummaryComponent,
    // ExamChartComponent,
    MonthlyMeetingComponent,
    NewsManagementComponent,
    NewsEditComponent,
    HomeComponent,
    // ThumbnailComponent,
    GalleryComponent,
    NewsContentComponent,
    FoodManagementComponent,
    TrainningHomeComponent,
    TrainningContentComponent,
    TrainningManagementComponent,
    TestSignalrComponent,
    MobileAppComponent,
    MobileComponent,
    ContractComponent,
    ContractPaymentComponent,
    TargetReportComponent,
    PayReportComponent,
    BanksComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // RouterModule.forRoot(routes),
    SharedModule,
    NgxGalleryModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
