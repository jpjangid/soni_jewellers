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
    this._apiService.getBarCode(object).subscribe((res:any)=> {
      this._utility.loader(false);
      // downloadFile(data: any , name?: any) {
        var blob = new Blob([res], { type: '.jpeg' });
        var url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = 'QR_Code' + ".png";
        anchor.href = url;
        anchor.click();
      // }
      console.log(res)
    })
  }

}
