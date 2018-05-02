import { Component, OnInit } from '@angular/core';
import { ApplicationUserService } from './applicationUser-service';
import { ApplicationUser } from './applicationUser';
import { ActivatedRoute, Params } from '@angular/router';

declare var swal;

@Component({
    templateUrl: 'app/applicationUsers/applicationUserSave.component.html'

})
export class ApplicationUserSaveComponent {

    constructor(private applicationUserService: ApplicationUserService, private route: ActivatedRoute) { }

    private newApplicationUser: ApplicationUser = new ApplicationUser();
    private passwordConfirm: string = "";
    private password: string = "";

    userName: string;
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.applicationUserService
                    .getUserById(id)
                    .then(response => {
                        this.newApplicationUser = response;
                        this.passwordConfirm = this.newApplicationUser.password

                    })
            }
        });
    }

    register() {
        this.newApplicationUser.role = "Administrator";
        if (this.password != this.passwordConfirm) {
            alert("Passwords don't match!");
            return;
        }
        this.newApplicationUser.password = this.password;
        this.applicationUserService.registerApplicationUser(this.newApplicationUser).then((result) => {
            swal("User registered successfully.", "", "success");
            this.goBack();
        })
            .catch((result) => {
            });
    }
    edit() {
        this.newApplicationUser.role = "Administrator";

        this.applicationUserService.put(this.newApplicationUser
        ).then((result) => {
            swal("User edited successfully.", "", "success");
            this.goBack();
        })
    }
    goBack() {
        window.history.back();
    }

}
