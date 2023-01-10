import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  data : any = {}

  constructor(private apiService : ApiServiceService) { }

  ngOnInit() {
    this.apiService.getAllData().then((res:any)=> {
      this.data = res?.returnValue[0];
    })
  }

}
