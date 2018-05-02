import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartsService } from '../charts/chart-service';

@Component({
    templateUrl: 'app/charts/lineChart.component.html'
})

export class LineChartComponent implements OnInit {
    chartData = [{ name: '2010', y: 20 }, { name: '2011', y: 30 }, { name: '2012', y: 40 }, { name: '2013', y: 60 }, { name: '2014', y: 60 }, { name: '2015', y: 80 }, { name: '2016', y: 80 }];

    constructor(private chartsService: ChartsService) {
    }
    lineData: Object;
    lineChart: Object = null;
    userName: string = localStorage.getItem("userName");
    godina: number;
    ciklusStudija: string;
    rok: string;
    studyYears = [];
    yearID: number;

    ngOnInit() {
        this.yearID = 0;
        this.chartsService.getStudyYears().then(response => {
            this.studyYears = response
        })

    }
    kreiraj() {
        this.lineChart = {
            title: { text: 'Register trend on faculty through years:' },
            chart: { type: 'line' },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                data: this.chartData,
                allowPointSelect: true
            }]
        };
    }
}
