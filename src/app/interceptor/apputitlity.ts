import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { ApiServiceService } from '../api-service.service';

@Injectable({
  providedIn: 'root'
})

export class AppUtility {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | undefined => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);
      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value ? { mismatch: true } : null;
    };
  }
    constructor(private _apiService : ApiServiceService){}
    dateTimeChange(date : any){
        return moment(date).format('YYYY-MM-DDT18:30:00')
    }

    dateChange(date : any){
      return moment(date).format('YYYY')
    }

    getLocalStorageDetails(){
      let local_id = localStorage.getItem('UserObject');
      if (local_id) {
        // return JSON.parse(local_id).supplierId;
        return JSON.parse(local_id);
      }
    }

  //validate user mobile number
  inputMobile(event: any){
    if(event.keyCode != 9){
      if(event.keyCode != 8 && event.keyCode != 189 && event.keyCode != 107 && event.keyCode != 16 && event.keyCode != 187 && event.keyCode != 86)  {
        if (!/^[0-9]$/.test(event.key)) {
          event.preventDefault();
        }
      }
    }
  }

  validateMobile(event: any) {
    const value = event.target.value;

    if (
      value &&
      /^[0-9]+$/.test(value) &&
      value.length < 10
    ) {
      // this.invalidMobile = true;
      return true
    }

    else {
      // this.invalidMobile = false;
      return false
    }
  }

  onFileChange(event: any) {    
    if (event?.target?.files && event?.target?.files[0]) {
      if(event.target.files[0].size < 2000000){
        if(event.target.files[0].type == 'image/jpeg' || 'image/jpg' || 'image/png' || 'application/pdf'){
          var filesAmount = event.target.files.length;
          if(filesAmount > 1){
            return event.target.files;
          }

          else{
            return event.target.files[0];
          }
        }
      }

      else{
        this._apiService.showMessage('Max file upload size should be 2MB ' , 'error')
        return false;
      }
    }
  }


  _valueLoader : boolean = false;
  loader(value : boolean){
    this._valueLoader = value;
  }

  getloaderValue(){
    return this._valueLoader;
  }
 downloadFile(data: any , name?: any) {
    var blob = new Blob([data], { type: '.xlsx' });
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = name + ".xlsx";
    anchor.href = url;
    anchor.click();
  }

  async getDropdownData() {
    let returnData : any = [];
    let otherCategoryData : any;
    await this._apiService.dropdowndata('state').then((res: any) => {
      returnData.push({stateDropdown : res.returnValue});
    })

    await this._apiService.dropdowndata('paymentTerms').then((res: any) => {
      returnData.push({paymentDropdown : res.returnValue});
    })

    await this._apiService.dropdowndata('purpose').then((res: any) => {
      returnData.push({purposeDropdown : res.returnValue});
    })

    await this._apiService.dropdowndata('manufacturing').then((res: any) => {
      returnData.push({manufacturingData : res.returnValue});
    })

    await this._apiService.dropdowndata('materialconstruction').then((res: any) => {
      returnData.push({materialofconstructionData : res.returnValue});
    })

    await this._apiService.dropdowndata('othercategory').then((res: any) => {
      otherCategoryData = res.returnValue;
      returnData.push({otherCategoryData : otherCategoryData});
    })

    return returnData;
  }

  getImageUrl(url : any){
    return `http://103.155.84.143:9072/SupplierOnboarding/`+url;
  }
}


//, paymentDropdown , purposeDropdown , manufacturingData , materialofconstructionData , otherCategoryData