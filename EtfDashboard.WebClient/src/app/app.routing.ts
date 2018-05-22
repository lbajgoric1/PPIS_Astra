import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { LoginGuard } from './login/login.guard';
import { ApplicationUserSaveComponent } from './applicationUsers/applicationUserSave.component';
import { ApplicationUserDetails } from './applicationUsers/applicationUserDetails.component';
import {HomeComponent} from './common/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'applicationUsers/details/:id', component: ApplicationUserDetails, canActivate: [AuthGuard] },
    { path: 'applicationUsersSave/:id', component: ApplicationUserSaveComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting { }