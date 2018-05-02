import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRouting } from './app.routing';

//Other
import { MyGlobals } from './my-globals';
import { AuthGuard } from './login/auth.guard';
import { LoginGuard } from './login/login.guard';
import { AuthService } from './login/auth.service';
import { LoginComponent } from './login/login.component';
import { HttpClient } from './common/http.client';
import { MenuComponent } from './common/menu.component';
import { GlobalEventsManager } from './common/global-events-manager';
import { ApplicationUserSaveComponent } from './applicationUsers/applicationUserSave.component';
import { ApplicationUserService } from './applicationUsers/applicationUser-service';
import { ApplicationUserDetails } from './applicationUsers/applicationUserDetails.component';
import { ChartModule } from 'angular2-highcharts';
import { AppComponent } from './app.component';
import { ColumnChartComponent } from './charts/columnChart.component';
import { PieChartComponent } from './charts/pieChart.component';
import { LineChartComponent } from './charts/lineChart.component';
import { ChartsService } from './charts/chart-service';


@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, AppRouting, ChartModule.forRoot(require('highcharts'))],
    declarations: [AppComponent, LoginComponent, MenuComponent, ApplicationUserDetails, ApplicationUserSaveComponent, LineChartComponent, ColumnChartComponent, PieChartComponent],
    bootstrap: [AppComponent],
    providers: [MyGlobals, AuthService, HttpClient, GlobalEventsManager, AuthGuard, LoginGuard, ApplicationUserService, ChartsService]
})
export class AppModule { }

