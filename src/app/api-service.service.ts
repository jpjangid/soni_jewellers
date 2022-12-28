import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  public _baseurl = environment.base_url;
  codec = new HttpUrlEncodingCodec;
  constructor(public http: HttpClient, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }

  showMessage(errorMsg: any, errorMsgCheck: any) {
    this.messageService.add({ severity: errorMsgCheck, summary: errorMsgCheck, detail: errorMsg });
  }

  postProduct(object):Promise<any>{
    return this.http.post(this._baseurl + 'Product' , object).toPromise()
  }

  login(object):Promise<any>{
    return this.http.post(this._baseurl + 'User/jewellerslogin' , object).toPromise()
  }
  
  billGenerate(object:any){
    return this.http.post(this._baseurl + 'GenerateBill' , object).toPromise()
  }

  getAllProductList(endPoint:any) {
    return this.http.get(this._baseurl+endPoint).toPromise();
  }
}
