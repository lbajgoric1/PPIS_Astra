import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GlobalEventsManager } from './global-events-manager';
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
    selector: 'main-menu',
    templateUrl: 'app/common/menu.component.html'
})

export class MenuComponent implements OnInit {
    public isAdmin: boolean;
    public showMenu: boolean;
    private userFirstName: string;
    private id: string;
    userName: string;

    constructor(private globalEventsManager: GlobalEventsManager, private authService: AuthService, private router: Router) {

        this.globalEventsManager.showMenu.subscribe((mode: boolean) => {
            this.showMenu = mode;
            this.userName = localStorage.getItem('userName');

        });

        this.globalEventsManager.isAdmin.subscribe((isAdmin: boolean) => {
            this.isAdmin = isAdmin;
        });

    }

    ngOnInit() {
        this.globalEventsManager.showMenu.emit(this.authService.isLoggedIn);
        this.globalEventsManager.isAdmin.emit(this.authService.isAdmin);

    }
    goToDetails() {
        this.id = localStorage.getItem("id");
        let link = ['applicationUsers/details', this.id];
        this.router.navigate(link);
    }
    logout() {
        this.globalEventsManager.showMenu.emit(false);
        this.authService.logout();
        this.router.navigate(['/login']);
        this.id = null;
    }

}