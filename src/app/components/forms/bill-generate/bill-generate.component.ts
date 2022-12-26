import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-generate',
  templateUrl: './bill-generate.component.html',
  styleUrls: ['./bill-generate.component.scss']
})
export class BillGenerateComponent implements OnInit {

  myDate: any;
  loading: boolean = false;
  submitButton: string = 'Submit'
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.addProduct();
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
    productId: new FormControl('', [Validators.required]),
    productWeight: new FormControl('', [Validators.required]),
    productQuantity: new FormControl('', [Validators.required]),
    productNetWeight: new FormControl('', [Validators.required])
  })

  getProductWeight(event) {
    let productList = this.productMasterList.filter(res => res.productId == event.target.value);
    console.log(productList[0].productWeight);
    this.itemMaster.controls['productWeight'].setValue(productList[0].productWeight)
    console.log(this.itemMaster.value);
  }

  itemMasterSubmit(itemMaster: FormGroupDirective) {

    if (this.itemMaster.valid) {
      let object = this.itemMaster.value;
      if (this.submitButton == 'Submit') {
      }
    }
  }

  getNetWeight() {
    let quantity: any;
    let weight: any;
    let netWeight: any;
    console.log(this.itemMaster.value);
    quantity = this.itemMaster.value.productQuantity;
    weight = this.itemMaster.value.productWeight;
    netWeight = quantity * weight;
    console.log(netWeight);
    this.itemMaster.controls['productNetWeight'].setValue(netWeight);
  }

  productList: any = [];
  totalNetWeight: any = 0;
  saveProduct() {
    if (this.itemMaster.valid) {
      let total: number = 0;
      this.productList.push(this.itemMaster.value);
      this.itemMaster.controls['productId'].setValue('')
      this.itemMaster.controls['productNetWeight'].setValue('')
      this.itemMaster.controls['productQuantity'].setValue('')
      this.itemMaster.controls['productWeight'].setValue('')

      this.productList.forEach(element => {
        total = element.productNetWeight
      });

      this.totalNetWeight = total + this.totalNetWeight;
      console.log('totalNetWeight', this.totalNetWeight);
    }

    else{
      
    }
  }
}
