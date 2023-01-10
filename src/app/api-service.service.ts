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
  
  putProduct(object):Promise<any>{
    return this.http.put(this._baseurl + 'Product' , object).toPromise()
  }

  getProducts():Promise<any>{
    return this.http.get(this._baseurl + 'Product').toPromise()
  }

  getAllProductList(endPoint:any) {
    return this.http.get(this._baseurl+endPoint).toPromise();
  }

  deleteProduct(endPoint:any) {
    return this.http.delete(this._baseurl + endPoint).toPromise();
  }



  login(object):Promise<any>{
    return this.http.post(this._baseurl + 'User/jewellerslogin' , object).toPromise()
  }

  getOTP(formData:any) {
    return this.http.post(this._baseurl+'Registration/OTPGenerate',formData).toPromise();
  }

  postOTP(formData:any) {
    return this.http.put(this._baseurl+'Registration/match-otp',formData).toPromise();
  }

  register(formData:any) {
    return this.http.post(this._baseurl+'Registration',formData).toPromise();
  }
  
  billGenerate(object:any){
    return this.http.post(this._baseurl + 'GenerateBill' , object).toPromise()
  }

  getAllRegisteredUser() {
    return this.http.get(this._baseurl + 'Registration').toPromise();
  }

  getBarCode(data:any) {
    return this.http.get(this._baseurl+'Registration/bar-code?Name=' + data?.name + '&City=' + data?.city + '&MobileNo=' + data?.mobile , { responseType: 'blob' }).toPromise();
  }

  getAllData() {
    return this.http.get(this._baseurl+'Counter').toPromise();
  }
}
