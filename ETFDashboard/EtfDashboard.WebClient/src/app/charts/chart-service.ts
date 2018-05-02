import { Injectable } from '@angular/core';
import { PieChartObject } from './pieChartObject';
import { ColumnChartObject } from './columnChartObject';
import { StudyYearObject } from './studyYearObject';
import { AcademicYearObject } from './academicYearObject';
import { DepartmentObject } from './departmentObject';
import { SubjectObject } from './subjectObject';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DatePipe } from '@angular/common';
import { HttpClient } from '../common/http.client';
import { MyGlobals } from '../my-globals';

@Injectable()
export class ChartsService {

    constructor(private myGlobals: MyGlobals, private httpClient: HttpClient) { }

    private chartsUrl = this.myGlobals.WebApiUrl + 'api/charts';

    getPieChartData(studyyear: number, academicYear: number): Promise<PieChartObject[]> {
        let url = this.chartsUrl + "/PieChart" + "?studyyear=" + studyyear + "&academicyear=" + academicYear;
        return this.httpClient
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
            });;
    }
   
    getColumnChartData(godina: number, ciklus: string): Promise<ColumnChartObject[]> {
        let url=this.chartsUrl + "/ColumnChart" + "?godina=" + godina + "&ciklus=" + ciklus;
        return this.httpClient
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
            });;
    }
    getStudyYears(): Promise<StudyYearObject[]> {
        let url = this.chartsUrl + "/StudyYears";
        return this.httpClient
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
            });;
    }
    getAcademicYears(): Promise<AcademicYearObject[]> {
        let url = this.chartsUrl + "/AcademicYears";
        return this.httpClient
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
            });;
    }

    getDepartments(): Promise<AcademicYearObject[]> {
        let url = this.chartsUrl + "/Departments";
        return this.httpClient
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
            });;
    }

    getSubjects(godina: number, odsjek: number): Promise<ColumnChartObject[]> {
        let url = this.chartsUrl + "/Subjects" + "?godina=" + godina + "&odsjek=" + odsjek;
        return this.httpClient
            .get(url)
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