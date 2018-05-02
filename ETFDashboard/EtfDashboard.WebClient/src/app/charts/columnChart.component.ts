import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartsService } from '../charts/chart-service';


@Component({
    templateUrl: 'app/charts/columnChart.component.html'
})

export class ColumnChartComponent implements OnInit {

    constructor(private chartsService: ChartsService) {

    }
    studyYears = [];
    yearID: number;
    o: Object;
    columnChart: Object;
    godina: number;
    k: Object;
    ciklusStudija: string;
    rok: string;
    userName: string = localStorage.getItem("userName");

    ngOnInit() {
        this.rok = "";
        this.yearID = 0;
        this.chartsService.getStudyYears().then(response => {
            this.studyYears = response
        })
    }

    kreiraj() {

        this.chartsService.getColumnChartData(this.godina, this.ciklusStudija).then(response => {
            this.o = response;
            let kategorije = [];
            if (this.rok == "Januar") {
                kategorije = [
                    'January',
                ]
                this.o = [{ name: response[0].name, data: [response[0].data[0]] }, { name: response[1].name, data: [response[1].data[0]] }, { name: response[2].name, data: [response[2].data[0]] }, { name: response[3].name, data: [response[3].data[0]] }]


            }
            else if (this.rok == "Jul") {
                kategorije = [
                    'July',
                ]
                this.o = [{ name: response[0].name, data: [response[0].data[1]] }, { name: response[1].name, data: [response[1].data[1]] }, { name: response[2].name, data: [response[2].data[1]] }, { name: response[3].name, data: [response[3].data[1]] }]


            }
            else if (this.rok == "Septembar") {
                kategorije = [
                    'September',
                ]
                this.o = [{ name: response[0].name, data: [response[0].data[2]] }, { name: response[1].name, data: [response[1].data[2]] }, { name: response[2].name, data: [response[2].data[2]] }, { name: response[3].name, data: [response[3].data[2]] }]

            }
            else if (this.rok == "Sve") {
                kategorije = [
                    'January',
                    'July',
                    'September'
                ]
                this.o = [{
                    name: response[0].name, data: [response[0].data[0], response[0].data[1], response[0].data[2]]
                },
                {
                    name: response[1].name, data: [response[1].data[0], response[1].data[1], response[1].data[2]]
                },
                {
                    name: response[2].name, data: [response[2].data[0], response[2].data[1], response[2].data[2]]
                },
                {
                    name: response[3].name, data: [response[3].data[0], response[3].data[1], response[3].data[2]]
                }]
            }
            else {
                return;
            }
            this.columnChart = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Pass percentage'
                },
                xAxis: {
                    categories: kategorije,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Pass percentage(%)'
                    }
                },

                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: this.o
            };
        });

        this.k = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Pass percentage'
            },
            xAxis: {
                categories: [
                    'January',
                    'July',
                    'September',
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Pass percentage (%)'
                }
            },

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Automatic Control and Electronics',
                data: [49.9, 30.5, 10.4]

            }, {
                name: 'Computing & Informatics',
                data: [83.6, 78.8, 98.5]

            }, {
                name: 'Telecommunications',
                data: [48.9, 38.8, 39.3]

            }, {
                name: 'Power Electrical Engineering',
                data: [48.9, 38.8, 39.3]

            }]
        };
    }

}
