import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';

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

  constructor(private _apiService : ApiServiceService, private _utility : AppUtility) { }

  async ngOnInit() {
    this._utility.loader(true);
    await this._apiService.getAllRegisteredUser().then((res:any) => {
      console.log(res);
      this.users = res?.returnValue;
      this._utility.loader(false);
    })
  }

  getImage(name:any, city:any, mobile:any) {
    let object = {
      name : name,
      city : city,
      mobile : mobile
    }
    this._utility.loader(true);
    this._apiService.getBarCode(object).then((res:any)=> {
      this._utility.loader(false);
      console.log(res)
      this._utility.downloadFile(res , 'QR_Code');
    })
  }

}
