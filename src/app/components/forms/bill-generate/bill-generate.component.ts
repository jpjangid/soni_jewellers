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
    this.addProduct();
  }

  breadcrumb = [
    {
      title: 'Bill Generate',
      subTitle: 'Dashboard'
    }
  ]

  productMasterList: any = [
    { productId: 0, productName: 'M vali', productWeight: 0.64 },
    { productId: 1, productName: 'fini casting', productWeight: 0.37 },
    { productId: 2, productName: 'h fini 48', productWeight: 0.32 },
    { productId: 3, productName: 'single line bali', productWeight: 0.46 },
    { productId: 4, productName: 'lung 7ng', productWeight: 0.39 },
    { productId: 5, productName: '16ng lung', productWeight: 0.47 },
    { productId: 6, productName: 'tarvali', productWeight: 0.53 },
    { productId: 7, productName: '1 lung', productWeight: 0.37 },
    { productId: 8, productName: 'v lung', productWeight: 0.16 },
    { productId: 9, productName: '16+1 lung', productWeight: 0.47 },
    { productId: 10, productName: 'h fini 58', productWeight: 0.4 },
  ];

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
    aadharNo : new FormControl('' , [Validators.required , Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]),
    panNo : new FormControl('' , [Validators.required , Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
  })

  registerMasterSubmit(register : FormGroupDirective){
    if(this.registerMaster.valid){
      this.nextPhase = !this.nextPhase;
    }
  }

  getProductWeight(event , index) {
    let productList = this.productMasterList.filter(res => res.productId == event.target.value);
    let product = this.getProductList();

    console.log(productList[0].productWeight);
    product.controls[index].get('productWt').setValue(productList[0].productWeight);
    product.controls[index].get('productCode').setValue(productList[0].productName);
    console.log(this.itemMaster.value);
  }

  itemMasterSubmit(itemMaster: FormGroupDirective) {
    console.log(this.itemMaster.valid);
    if (this.itemMaster.valid) {
      this.nextPhase = !this.nextPhase
      let array : any = [];
      let product = this.getProductList();
      product.value.forEach(element => {
        array.push({
          productId : element.productId,
          productWt : element.productWt,
          productCode : element.productCode,
          productQty : element.productQty,
          netWt : element.netWt
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
    console.log(product.valid , product);    
    if(product.valid){
      product.push(this.fb.group({
        productId: new FormControl('', [Validators.required]),
        productWt: new FormControl('', [Validators.required]),
        productQty: new FormControl('', [Validators.required]),
        netWt: new FormControl('', [Validators.required]),
        productCode: new FormControl('', [Validators.required])
      }))
    }
  }

  getNetWeight(index) {
    let quantity: any;
    let weight: any;
    let netWeight: any;
    let product = this.getProductList();
    console.log(this.itemMaster.value);
    quantity = this.itemMaster.value.productList[index]['productQty'];
    weight = this.itemMaster.value.productList[index]['productWt'];
    netWeight = quantity * weight;
    console.log(netWeight);
    product.controls[index].get('netWt').setValue(netWeight);
    this.getTotalWeight();
  }

  getTotalWeight(){
    this.totalNetWeight = 0;
    let product = this.getProductList();
    product.value.forEach((res:any)=>{
      this.totalNetWeight = this.totalNetWeight + res.netWt;
    })
  }


  getProductList(){
    return this.itemMaster.get('productList') as FormArray
  }

  // productList: any = [];
  totalNetWeight: any = 0;
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
