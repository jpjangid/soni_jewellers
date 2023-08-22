import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { ApiServiceService } from '../api-service.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
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

  downloadFile(data: any, name?: any) {
    var blob = new Blob([data], { type: '.png' });
    var url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = name + ".png";
    anchor.href = url;
    anchor.click();
    console.log(anchor , url);
  }

  
  exportExcel(products) {
    console.log(products);
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(products);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "registeredUserList");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

}
