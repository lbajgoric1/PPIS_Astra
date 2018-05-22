import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { MyGlobals } from '../my-globals';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    public isLoggedIn: boolean = false;
    public isAdmin: boolean = false;
    public currentUser: string = null;
    public userName: string = null;

    constructor(public http: Http, public myGlobals: MyGlobals, public router: Router) {
        this.isLoggedIn = !!localStorage.getItem('auth_token');
        this.isAdmin = !!localStorage.getItem('isAdmin');
    }

    login(username, password) {
        let data = "grant_type=password&username=" + username + "&password=" + password;
        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.myGlobals.WebApiUrl + 'token', data, { headers: contentHeaders })
            .toPromise()
            .then(response => {
                this.handleSuccess(response);
            }
            )
            .catch(this.handleError);
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.isLoggedIn = false;


        localStorage.removeItem('isAdmin');
        this.isAdmin = false;



        localStorage.removeItem('userName');
        this.userName = null;

        localStorage.removeItem('id');
    }

    private handleSuccess(response: any) {

        localStorage.setItem('auth_token', response.json().access_token);

        let roles = JSON.parse(response.json().roles);

        localStorage.setItem('id', response.json().Id)
        let isAdmin = roles.filter(role => role == 'Administrator').length > 0;

        if (isAdmin) {
            localStorage.setItem('isAdmin', 'true');
            this.isAdmin = true;
        }


        localStorage.setItem('userName', response.json().userName);
        this.isLoggedIn = true;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
