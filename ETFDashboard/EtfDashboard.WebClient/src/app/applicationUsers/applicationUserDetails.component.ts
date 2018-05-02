import {
} from './applicationUser';
import { ApplicationUserService } from './applicationUser-service';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ApplicationUser } from './applicationUser'

@Component({
    templateUrl: 'app/applicationUsers/applicationUserDetails.component.html'
})

export class ApplicationUserDetails implements OnInit {
    constructor(
        private userService: ApplicationUserService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    private user: ApplicationUser;
    private id: string = null;
    ngOnInit() {

        this.route.params.forEach((params: Params) => {
            this.id = params['id'];

            this.userService
                .getUserById(this.id)
                .then(response => {
                    this.user = response;
                })
        });

    }

    editUser() {
        if (this.id != null) {
            let link = ['applicationUsersSave/', this.id];
            this.router.navigate(link);
        }
    }
    goBack() {
        window.history.back();
    }
}