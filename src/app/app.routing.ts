import { Routes, RouterModule } from '@angular/router';
import { AppUrl } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { BranchComponent } from './components/branch/branch.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SaleInfoComponent } from './components/sale-info/sale-info.component';
import { ExamChartComponent } from './components/exam-chart/exam-chart.component';
import { MonthlyMeetingComponent } from  './components/monthly-meeting/monthly-meeting.component';

const RouteList: Routes = [
    { path: '', redirectTo: AppUrl.Login, pathMatch: 'full' },
    { path: AppUrl.Login, component: LoginComponent },
    { path: AppUrl.Branch, component: BranchComponent },
    { path: AppUrl.Summary, component: SummaryComponent },
    { path: AppUrl.SaleInfo, component: SaleInfoComponent },
    { path: AppUrl.ExamChart, component: ExamChartComponent },
    { path: AppUrl.MonthlyMeeting, component: MonthlyMeetingComponent}
];

export const AppRouting = RouterModule.forRoot(RouteList);
