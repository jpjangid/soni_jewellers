import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private apiService : ApiServiceService) { }

    async ngOnInit() {
        // await this.apiService.getAllData().then((res:any)=> {
        //     console.log(res);
        // })
    }

    breadcrumb = [
        {
            title: 'Hey, Soni Jewellers',
            subTitle: 'Dashboard'
        }
    ]

}