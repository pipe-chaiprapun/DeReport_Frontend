import { Routes, RouterModule } from '@angular/router';
import { AppUrl } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { BranchComponent } from './components/branch/branch.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SaleInfoComponent } from './components/sale-info/sale-info.component';
import { ExamChartComponent } from './components/exam-chart/exam-chart.component';
import { MonthlyMeetingComponent } from './components/monthly-meeting/monthly-meeting.component';
import { NewsManagementComponent } from './components/news-management/news-management.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { HomeComponent } from './components/home/home.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NewsContentComponent } from './components/news-content/news-content.component';

const RouteList: Routes = [
    { path: '', redirectTo: AppUrl.Home, pathMatch: 'full' },
    { path: AppUrl.Login, component: LoginComponent },
    { path: AppUrl.Branch, component: BranchComponent },
    { path: AppUrl.Summary, component: SummaryComponent },
    { path: AppUrl.SaleInfo, component: SaleInfoComponent },
    { path: AppUrl.ExamChart, component: ExamChartComponent },
    { path: AppUrl.MonthlyMeeting, component: MonthlyMeetingComponent },
    { path: AppUrl.NewsManagement, component: NewsManagementComponent },
    { path: AppUrl.NewsEdit, component: NewsEditComponent },
    { path: AppUrl.Home, component: HomeComponent },
    { path: AppUrl.Thumbnail, component: ThumbnailComponent },
    { path: AppUrl.Gallery, component: GalleryComponent },
    { path: AppUrl.Home, component: HomeComponent},
    { path: AppUrl.NEWSContent, component: NewsContentComponent}
];

export const AppRouting = RouterModule.forRoot(RouteList);
