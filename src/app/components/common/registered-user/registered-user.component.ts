import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Table } from 'primeng/table';
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

  dateFilterVal:string = '';

  users:any = [];
  filterval: string;

  constructor(private _apiService : ApiServiceService, private _utility : AppUtility) { }

  @ViewChild ('dt') FilteredData:Table;

  async ngOnInit() {
    this._utility.loader(true);
    await this._apiService.getAllRegisteredUser().then((res:any) => {
      console.log(res);
      // this.users = res?.returnValue;
      if(res.success){
        res?.returnValue.forEach(element => {
          element.billDate = moment(element.billDate).format('DD-MM-YYYY')
        });
        this.users = [...new Map(res?.returnValue.map(item => [item['billNo'], item])).values()];
        console.log(this.users)
        this._utility.loader(false);
      }

      else{
        this._utility.loader(false);
      }
    })
  }

  getImage(registrationId) {
    console.log(registrationId);
    this._utility.loader(true);
    this._apiService.getBarCode(registrationId).then((res:any)=> {
      this._utility.loader(false);
      console.log(res.filePath1)
      this._utility.downloadFile(res.filePath1 , 'QR_Code');
    })
  }

  searchFilter(event?: any) {
    let date = moment(event).format('DD-MM-YYYY')
    this.FilteredData.filter(date, 'billDate', 'contains');
  }

  reset(dt) {
    dt.reset();
    this.filterval = '';
    this.dateFilterVal = ''
  }


  exportExcel(){
    this._utility.exportExcel(this.users);
  }

  downloadFile(customer:any){
    this._apiService.getBarCodeById(customer.registrationId).then((res:any)=>{
      console.log(res);
      this._utility.downloadFile(res , 'QRCode_')
    })
  }

}
