import { Injectable } from '@angular/core';
import { ApplicationUser } from './applicationUser';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DatePipe } from '@angular/common';
import { HttpClient } from '../common/http.client';
import { MyGlobals } from '../my-globals';

@Injectable()
export class ApplicationUserService {

    constructor(private myGlobals: MyGlobals, private httpClient: HttpClient) { }

    private applicationUsersUrl = this.myGlobals.WebApiUrl + 'api/applicationUsers';


    registerApplicationUser(newApplicationUser: ApplicationUser) {
        let url = this.applicationUsersUrl;

        return this.httpClient
            .post(url, newApplicationUser).toPromise().then(response => this.extractData(response)
            );
    }

    getUserById(id: string): Promise<ApplicationUser> {
        let url = this.applicationUsersUrl + '/' + id;

        return this.httpClient
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
                window.history.back();
            });
    }

    put(user: ApplicationUser): Promise<ApplicationUser> {
        let url = this.applicationUsersUrl + '/' + user.id

        return this.httpClient
            .put(url, JSON.stringify(user))
            .toPromise()
            .then(response =>
                response.json())
            .catch((error) => {
                window.history.back();
            });
    }
    getUsers(): Promise<ApplicationUser[]> {
        return this.httpClient
            .get(this.applicationUsersUrl)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
            });;
    }
    private extractData(res: any) {
        let body;

        // check if empty, before call json
        if (res.text()) {
            body = res.json();
        }

        return body || {};
    }
}