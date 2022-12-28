import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/api-service.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';
@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {

  tax_dropdown: any = [];
  errorMsg: string = ''
  date: any;
  errorMsgCheck: string = ''
  itemMasterTable: any = [];
  myDate: any;
  loading: boolean = false;
  submitButton: string = 'Submit'
  productList:any
  constructor(private fb: FormBuilder , private apiService : ApiServiceService , private utility : AppUtility) { }

  ngOnInit(): void {
    this.date = new Date();
    this.getAllProduct();
  }

  breadcrumb = [
    {
      title: 'Product Master',
      subTitle: 'Dashboard'
    }
  ]

  itemMaster = this.fb.group({
    itemCode: new FormControl('', [Validators.required]),
    rawPartWeight: new FormControl('', [Validators.required])
  })

  itemMasterSubmit(itemMaster: FormGroupDirective) {

    if (this.itemMaster.valid) {
      this.utility.loader(true);
      let object = {
        productCode : this.itemMaster.value.itemCode, 
        productWt : this.itemMaster.value.rawPartWeight     
      }

      this.apiService.postProduct(object).then((res:any)=>{
        this.utility.loader(false);
        console.log(res.status);
        if(res.status){
          this.apiService.showMessage(res.message , 'success');
          Object.keys(this.itemMaster.controls).forEach((key:any)=>{
            this.itemMaster.controls[key].setErrors(null);
          })
          this.getAllProduct()
        }

        else{
          this.apiService.showMessage(res.message , 'error')
        }
      })
    }
  }

  async getAllProduct() {
    this.utility.loader(true);
    await this.apiService.getAllProductList('Product').then((res:any)=> {
      console.log(res);
      this.utility.loader(false);
      this.productList = res.returnValue;
    })
  }

  async onClick(string:any, index:any, id:any) {
    if(string == 'edit') {
      this.itemMaster.controls['productCode'].setValue(this.productList[index].productCode);
      this.itemMaster.controls['productWt'].setValue(this.productList[index].productWt);
    }
    else {
      await this.apiService.deleteProduct('Product/'+id).then((res:any) => {
        console.log(res);
      })
    }
  }
}
