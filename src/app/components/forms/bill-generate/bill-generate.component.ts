import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  otpButton : string = 'Get Otp'
  nextPhase : boolean = false;
  totalFine:any=0;
  coupanCode: any;
  
  constructor(private fb: FormBuilder , private apiService : ApiServiceService , private router : Router) { }

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

  displayResponsive:boolean = false;

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
    billDate: new FormControl('', [Validators.required]),
    productList : this.fb.array([])
  })

  registerMaster = this.fb.group({
    name : new FormControl('' , [Validators.required]),
    fname : new FormControl('' , [Validators.required]),
    sname : new FormControl('' , [Validators.required]),
    cname : new FormControl('' , [Validators.required]),
    mobileNo : new FormControl('' , [Validators.required]),
    aadharNo : new FormControl('' , [Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]),
    panNo : new FormControl('' , [Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
  })

  otpMaster = this.fb.group({
    otp : new FormControl(''),
    mobileNo : new FormControl('' , [Validators.required])
  })

  showRegistration : boolean = false;
  otpMasterSubmit(otp : FormGroupDirective){
    if(otp.valid){
      let object = {
        mobileNo : this.otpMaster.value.mobileNo,
        otp : Number(this.otpMaster.value.otp)
      }

      this.apiService.postOTP(object).then((res:any)=>{
        if(res.success){
          this.apiService.showMessage(res.message , 'success');
          this.registerMaster.controls['mobileNo'].setValue(this.otpMaster.value?.mobileNo)
          this.otpMaster.reset();
          Object.keys(this.otpMaster.controls).forEach((key:any)=>{
            this.otpMaster.controls[key].setErrors(null);
          })
          otp.resetForm();
          this.showRegistration = true;
        }

        else{
          this.apiService.showMessage(res.message , 'error')

        }
      })
    }
  }

  registerMasterSubmit(register : FormGroupDirective){
    console.log(this.registerMaster.valid , this.registerMaster.controls);
    if(this.registerMaster.valid){
      let object = {
        "billNo": JSON.parse(localStorage.getItem('billNo')),
        "billDate": this.itemMaster.value.billDate,
        "name": this.registerMaster.value.name,
        "fName": this.registerMaster.value.fname,
        "shopName": this.registerMaster.value.sname,
        "city": this.registerMaster.value.cname,
        "mobileNo": this.registerMaster.value.mobileNo,
      }

      if(this.registerMaster.value.aadharNo){
        object['aadharCard'] = this.registerMaster.value.aadharNo;
      }

      if(this.registerMaster.value.panNo){
        object['panCard'] = this.registerMaster.value.panNo;
      }

      this.apiService.register(object).then((res:any)=>{
        console.log(res);
        if(res.success){
          this.apiService.showMessage(res.message , 'success');
          this.registerMaster.reset();
          Object.keys(this.otpMaster.controls).forEach((key:any)=>{
            this.otpMaster.controls[key].setErrors(null);
          })
          register.resetForm();
          this.nextPhase = false;
          this.showOtp = false;
          // this.router.navigateByUrl('coupon/'+ res.returnValue);
          this.coupanCode = res?.returnValue;
          this.displayResponsive = true
        }

        else{
          this.apiService.showMessage(res.message , 'error');
        }
      })
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
        billDate : itemMaster.value.billDate,
        generateBillListDetails : array
      }

      localStorage.setItem('billNo' , JSON.stringify(itemMaster.value.billNo));

      this.apiService.billGenerate(object).then((res:any)=>{
        if(res.success){
          this.nextPhase = true;
        }
        else{
          this.apiService.showMessage(res.message , 'error')
        }
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
    this.totalFine = 0;
    let product = this.getProductList();
    product.value.forEach((res:any)=>{
      console.log(res.profit)
      this.totalNetWeight = this.totalNetWeight + res.profit;
    })
    product.value.forEach((res:any)=>{
      console.log(res.netWt);
      this.totalFine = this.totalFine + res.netWt;
    })
    console.log(this.totalNetWeight);
    this.totalNetWeight = (this.totalNetWeight * 100)/9;
  }


  getProductList(){
    return this.itemMaster.get('productList') as FormArray
  }

  // productList: any = [];
  totalNetWeight: any = 0;
  showOtp : any;
  getOTP(){
    if(this.otpMaster.controls['mobileNo'].valid) {
      let object = {
        mobileNo : this.otpMaster.controls['mobileNo'].value
      }
      this.apiService.getOTP(object).then((res:any)=> {
        this.otpMaster.setControl('otp', this.fb.control('', [Validators.required]))
      })
      this.showOtp = true;
    }
  }

  removeProduct(index){
    let product = this.getProductList();
    product.removeAt(index);
    this.getTotalWeight();
  }
}
