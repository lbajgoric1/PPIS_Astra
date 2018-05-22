import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalEventsManager } from '../common/global-events-manager';
import { AuthService } from './auth.service';

declare var swal;

@Component({
    selector: 'login',
    templateUrl: '/app/login/login.component.html',
})
export class LoginComponent {
    constructor(private authService: AuthService, private router: Router, private globalEventsManager: GlobalEventsManager) { }

    login(event, username, password) {
        event.preventDefault();
        this.authService.login(username, password).then((result) => {
            this.globalEventsManager.isAdmin.emit(this.authService.isAdmin);
            this.globalEventsManager.showMenu.emit(true);
            if (localStorage.getItem('isAdmin')) this.router.navigate(['/home']);
        })
            .catch((result) => {
                swal("The username or password are incorrect!", "", "error");
            });
    }
    addUser() {
        let id = "";
        let link = ['applicationUsersSave/', id];
        this.router.navigate(link);
    }
    logout(event) {
        event.preventDefault();
        this.authService.logout();
    }
}