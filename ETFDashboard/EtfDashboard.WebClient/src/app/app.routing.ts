import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { LoginGuard } from './login/login.guard';
import { ApplicationUserSaveComponent } from './applicationUsers/applicationUserSave.component';
import { ApplicationUserDetails } from './applicationUsers/applicationUserDetails.component';

import { ColumnChartComponent } from './charts/columnChart.component';
import { PieChartComponent } from './charts/pieChart.component';
import { LineChartComponent } from './charts/lineChart.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'applicationUsers/details/:id', component: ApplicationUserDetails, canActivate: [AuthGuard] },
    { path: 'applicationUsersSave/:id', component: ApplicationUserSaveComponent },
    { path: 'charts/piechart', component: PieChartComponent, canActivate: [AuthGuard] },
    { path: 'charts/columnchart', component: ColumnChartComponent, canActivate: [AuthGuard] },
    { path: 'charts/linechart', component: LineChartComponent, canActivate: [AuthGuard] }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting { }