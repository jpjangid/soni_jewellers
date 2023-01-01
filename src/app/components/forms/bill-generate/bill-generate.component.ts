import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-bill-generate',
  templateUrl: './bill-generate.component.html',
  styleUrls: ['./bill-generate.component.scss']
})
export class BillGenerateComponent implements OnInit {

  myDate: any;
  loading: boolean = false;
  submitButton: string = 'Submit'
  nextPhase : boolean = false;
  
  constructor(private fb: FormBuilder , private apiService : ApiServiceService) { }

  ngOnInit(): void {
    this.getProducts()
    this.addProduct();
  }

  breadcrumb = [
    {
      title: 'Bill Generate',
      subTitle: 'Dashboard'
    }
  ]

  productMasterList: any = [];

  getProducts(){
    this.apiService.getProducts().then((res:any)=>{
      console.log(res);
      if(res.status){
        this.productMasterList = res.returnValue;
      }

      else{
        this.productMasterList = [];
      }
    })
  }

  itemMaster = this.fb.group({
    billNo: new FormControl('', [Validators.required]),
    productList : this.fb.array([])
  })

  registerMaster = this.fb.group({
    name : new FormControl('' , [Validators.required]),
    fname : new FormControl('' , [Validators.required]),
    sname : new FormControl('' , [Validators.required]),
    cname : new FormControl('' , [Validators.required]),
    otp : new FormControl('' , [Validators.required]),
    mobileNo : new FormControl('' , [Validators.required]),
    aadharNo : new FormControl('' , [Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]),
    panNo : new FormControl('' , [Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
  })

  registerMasterSubmit(register : FormGroupDirective){
    if(this.registerMaster.valid){
      this.nextPhase = !this.nextPhase;
    }
  }

  getProductWeight(event , index) {
    let productList = this.productMasterList.filter(res => res.productId == event.target.value);
    let product = this.getProductList();
    product.controls[index].get('tanchIn').setValue(productList[0].productWt);
    product.controls[index].get('productCode').setValue(productList[0].productCode);
  }

  itemMasterSubmit(itemMaster: FormGroupDirective) {
    console.log(this.itemMaster.valid);
    if (this.itemMaster.valid) {
      this.nextPhase = !this.nextPhase;
      let array : any = [];
      let product = this.getProductList();
      console.log(product.value);
      product.value.forEach(element => {
        array.push({
          productId : element.productId,
          productWt : element.weight,
          productQty : element.tanchOt,
          netWt : element.netWt,
          profit : element.profit,
          productWeight : element.productWeight
        })
      });

      let object = {
        billNo : itemMaster.value.billNo,
        generateBillListDetails : array
      }

      this.apiService.billGenerate(object).then((res:any)=>{
        console.log(res); 
      })

    }
  }

  addProduct(){
    let product = this.getProductList();
    if(product.valid){
      product.push(this.fb.group({
        productId: new FormControl('', [Validators.required]),
        tanchOt: new FormControl('', [Validators.required]),
        weight: new FormControl('', [Validators.required]),
        tanchIn: new FormControl('', [Validators.required]),
        netWt: new FormControl('', [Validators.required]),
        productCode: new FormControl('', [Validators.required]),
        profit: new FormControl('', [Validators.required])
      }))
    }
  }

  getNetWeight(index) {
    let tanchIn: any;
    let tanchOt: any;
    let weight: any;
    let product = this.getProductList();
    let profit : any = 0;
    tanchIn = this.itemMaster.value.productList[index]['tanchIn'];
    tanchOt = this.itemMaster.value.productList[index]['tanchOt'];
    weight = this.itemMaster.value.productList[index]['weight'];
    if(tanchOt && weight){
      let netWeight = tanchOt * weight;
      product.controls[index].get('netWt').setValue(netWeight);
      profit = ((tanchOt * weight) - (tanchIn * weight));
      product.controls[index].get('profit').setValue(profit);
      this.getTotalWeight();
    }

    
  }

  getTotalWeight(){
    this.totalNetWeight = 0;
    let product = this.getProductList();
    product.value.forEach((res:any)=>{
      this.totalNetWeight = this.totalNetWeight + res.profit;
    })

    this.totalNetWeight = this.totalNetWeight * 10;
  }


  getProductList(){
    return this.itemMaster.get('productList') as FormArray
  }

  // productList: any = [];
  totalNetWeight: number = 0;
  showOtp : any;
  getOtp(){
    this.showOtp = true;
  }

  removeProduct(index){
    let product = this.getProductList();
    product.removeAt(index);
    this.getTotalWeight();
  }
}
