import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.scss']
})
export class RegisteredUserComponent implements OnInit {

  breadcrumb = [
    {
      title: 'Registered User',
      subTitle: 'Dashboard'
    }
  ]

  users:any = [];

  constructor(private _apiService : ApiServiceService) { }

  ngOnInit() {
    this._apiService.getAllRegisteredUser().then((res:any) => {
      console.log(res);
      this.users = res?.returnValue;
    })
  }

}
