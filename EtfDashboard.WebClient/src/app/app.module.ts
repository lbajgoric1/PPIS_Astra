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
import { HomeComponent } from './common/home.component';
import { GlobalEventsManager } from './common/global-events-manager';
import { ApplicationUserSaveComponent } from './applicationUsers/applicationUserSave.component';
import { ApplicationUserService } from './applicationUsers/applicationUser-service';
import { ApplicationUserDetails } from './applicationUsers/applicationUserDetails.component';
import { AppComponent } from './app.component';


@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, AppRouting],
    declarations: [AppComponent, LoginComponent, HomeComponent,MenuComponent, ApplicationUserDetails, ApplicationUserSaveComponent],
    bootstrap: [AppComponent],
    providers: [MyGlobals, AuthService, HttpClient, GlobalEventsManager, AuthGuard, LoginGuard, ApplicationUserService]
})
export class AppModule { }

