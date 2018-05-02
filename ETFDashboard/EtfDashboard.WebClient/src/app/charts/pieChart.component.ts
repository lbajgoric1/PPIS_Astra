import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartsService } from '../charts/chart-service';
declare var swal;

@Component({
    templateUrl: 'app/charts/pieChart.component.html'
})

export class PieChartComponent implements OnInit {
    chartData = [{ 'name': 'ri', y: 30 }, { name: 'tk', y: 15 }, { name: 'aie', y: 5 }, { name: 'ee', y: 10 }];

    constructor(private chartsService: ChartsService) {

    }
    brojStudenta: boolean = false;
    prolaznost: boolean = false;
    bachelorStudentsPie: Object;
    studyYears = [];
    academicYears = [];
    departments = [];
    subjects = [];
    subjectID: number;
    departmentID: number;
    yearID: number;
    academicyearID: number;
    filterId: number;
    studyYearIDForPassFilter: number;
    userName: string = localStorage.getItem("userName");

    ngOnInit() {
        this.filterId = 0;
        this.yearID = 0;
        this.studyYearIDForPassFilter = 0;
        this.academicyearID = 0;
        this.departmentID = 0;
        this.subjectID = 0;
        this.chartsService.getStudyYears().then(response => {
            this.studyYears = response
        })
        this.chartsService.getAcademicYears().then(response => {
            this.academicYears = response
        })
        this.chartsService.getDepartments().then(response => {
            this.departments = response
        })
    }
    getSubjects(departmentID) {
        if (departmentID != 0 && this.studyYearIDForPassFilter != 0) {
            this.chartsService.getSubjects(this.studyYearIDForPassFilter, departmentID).then(response => {
                this.subjects = response
            })
        }
    }
    kreirajZaBrojStudenata() {
        if (this.yearID == 0 || this.academicyearID == 0) {
            return;
        }
        if (this.studyYears.length > 0 && this.academicYears.length > 0) {

            let nazivStudijske = this.studyYears.filter(x => x.id == this.yearID)[0].title;
            let nazivAkademske = this.academicYears.filter(x => x.id == this.academicyearID)[0].title;
            this.chartsService.getPieChartData(this.yearID, this.academicyearID).then(response => {
                if (response.length == 0 || response == undefined) {
                    swal("No record found.", "", "info");
                    return;
                }
                this.bachelorStudentsPie = {
                    title: { text: 'Number of students per department on study year ' + nazivStudijske + ' and ' + nazivAkademske + ':' },
                    chart: { type: 'pie' },
                    series: [{
                        data: response,
                        allowPointSelect: true
                    }]
                };
            });
        }
    }

    kreirajZaProlaznost() {
        this.chartData = [{ 'name': 'Pass', y: 38 }, { name: 'Fail', y: 62 }];
        this.bachelorStudentsPie = {
            title: { text: 'Pass score:' },
            chart: { type: 'pie' },
            colors: ['#00FF00', '#FF0000'],
            series: [{
                data: this.chartData,
                allowPointSelect: true
            }]
        };
    }
}
