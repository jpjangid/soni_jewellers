import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) { }

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

  // productList = this.fb.group({
  //   productId: new FormControl('', [Validators.required]),
  //   productWeight: new FormControl('', [Validators.required]),
  //   productQuantity: new FormControl('', [Validators.required]),
  //   productNetWeight: new FormControl('', [Validators.required])
  // })

  getProductWeight(event , index) {
    let productList = this.productMasterList.filter(res => res.productId == event.target.value);
    let product = this.getProductList();

    console.log(productList[0].productWeight);
    product.controls[index].get('productWeight').setValue(productList[0].productWeight)
    // this.itemMaster.controls['productWeight'].setValue(productList[0].productWeight)
    // product.controls.setValue(90)
    console.log(this.itemMaster.value);
  }

  itemMasterSubmit(itemMaster: FormGroupDirective) {
    console.log(this.itemMaster.valid);
    
    if (this.itemMaster.valid) {
      let object = this.itemMaster.value;
      if (this.submitButton == 'Submit') {
      }
    }
  }

  addProduct(){
    let product = this.getProductList();
    console.log(product.valid , product);    
    if(product.valid){
      product.push(this.fb.group({
        productId: new FormControl('', [Validators.required]),
        productWeight: new FormControl('', [Validators.required]),
        productQuantity: new FormControl('', [Validators.required]),
        productNetWeight: new FormControl('', [Validators.required])
      }))
    }
  }

  getNetWeight(index) {
    let quantity: any;
    let weight: any;
    let netWeight: any;
    let product = this.getProductList();
    console.log(this.itemMaster.value);
    quantity = this.itemMaster.value.productList[index]['productQuantity'];
    weight = this.itemMaster.value.productList[index]['productWeight'];
    netWeight = quantity * weight;
    console.log(netWeight);
    product.controls[index].get('productNetWeight').setValue(netWeight);
    this.getTotalWeight();
  }

  getTotalWeight(){
    this.totalNetWeight = 0;
    let product = this.getProductList();
    product.value.forEach((res:any)=>{
      this.totalNetWeight = this.totalNetWeight + res.productNetWeight;
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
    const control = <FormArray>this.itemMaster.controls['productList'];
    control.removeAt(index);
    this.getTotalWeight();
  }
}
