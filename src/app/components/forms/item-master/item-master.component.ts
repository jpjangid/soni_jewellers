import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import { ApiServiceService } from 'src/app/api-service.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';
@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {

  tax_dropdown: any = [];
  msgs: Message[] = [];
  errorMsg: string = ''
  date: any;
  errorMsgCheck: string = ''
  itemMasterTable: any = [];
  myDate: any;
  loading: boolean = false;
  submitButton: string = 'Submit'
  productList:any = [];
  constructor(private fb: FormBuilder , private apiService : ApiServiceService , private utility : AppUtility , private confirmationService : ConfirmationService) { }

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
    rawPartWeight: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required])
  })

  itemMasterSubmit(itemMaster: FormGroupDirective) {

    if (this.itemMaster.valid) {
      this.utility.loader(true);
      if(this.submitButton == 'Submit'){
        let object = {
          productCode : this.itemMaster.value.itemCode, 
          productWt : this.itemMaster.value.rawPartWeight,     
          stock : this.itemMaster.value.stock     
        }
  
        this.apiService.postProduct(object).then((res:any)=>{
          this.utility.loader(false);
          console.log(res.status);
          if(res.status){
            this.itemMaster.reset();
            this.apiService.showMessage(res.message , 'success');
            Object.keys(this.itemMaster.controls).forEach((key:any)=>{
              this.itemMaster.controls[key].setErrors(null);
            })
            itemMaster.resetForm();
            this.getAllProduct()
          }
  
          else{
            this.apiService.showMessage(res.message , 'error')
          }
        })
      }
      else{
        let object = {
          productCode : this.itemMaster.value.itemCode, 
          productWt : this.itemMaster.value.rawPartWeight,
          stock : this.itemMaster.value.stock,
          productId : this.editProductId   
        }
  
        this.apiService.putProduct(object).then((res:any)=>{
          this.utility.loader(false);
          console.log(res.status);
          if(res.status){
            this.apiService.showMessage(res.message , 'success');
            this.itemMaster.reset();
            Object.keys(this.itemMaster.controls).forEach((key:any)=>{
              this.itemMaster.controls[key].setErrors(null);
            })
            itemMaster.resetForm();
            this.submitButton = 'Submit'
            this.getAllProduct();
          }
  
          else{
            this.apiService.showMessage(res.message , 'error');
          }
        })
      }
    }
  }

  async getAllProduct() {
    this.utility.loader(true);
    await this.apiService.getAllProductList('Product').then((res:any)=> {
      console.log(res);
      this.utility.loader(false);
      if(res.status){
        this.productList = res.returnValue;
      }

      else{
        this.productList = [];
        this.utility.loader(false);
      }
    })
  }


  editProductId : any;
  async onClick(string:any, index:any, product:any) {
    console.log(product);    
    if(string == 'edit') {
      this.editProductId = product.productId;
      this.itemMaster.controls['itemCode'].setValue(product.productCode);
      this.itemMaster.controls['rawPartWeight'].setValue(product.productWt);
      this.itemMaster.controls['stock'].setValue(product.stock);
      this.submitButton = 'Update';
      window.scroll(0,0)
    }
    else {
      
    }
  }

  confirm1(product:any) {
    console.log(product);
    this.utility.loader(true);
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Delete Supplier Record',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
            await this.apiService.deleteProduct('Product/' + product.productId).then((res:any) => {
              this.utility.loader(false);
              if(res.status){
                console.log(res);
                this.apiService.showMessage(res.message , 'success');
                Object.keys(this.itemMaster.controls).forEach((key:any)=>{
                  this.itemMaster.controls[key].setErrors(null);
                })
                this.getAllProduct();
              }
              
              else{
                this.getAllProduct();
              }
            })
        },
        reject: () => {
            this.utility.loader(false);
            this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        }
        
    });
}
}
