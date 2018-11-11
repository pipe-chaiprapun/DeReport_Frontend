import { Routes, RouterModule } from '@angular/router';
import { AppUrl } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { ReportComponent } from './components/report/report.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ChartComponent } from './components/chart/chart.component';

const RouteList: Routes = [
    { path: '', redirectTo: AppUrl.Login, pathMatch: 'full' },
    { path: AppUrl.Login, component: LoginComponent },
    { path: AppUrl.Report, component: ReportComponent },
    { path: AppUrl.Summary, component: SummaryComponent},
    { path: AppUrl.Chart, component: ChartComponent}
];

export const AppRouting = RouterModule.forRoot(RouteList);
