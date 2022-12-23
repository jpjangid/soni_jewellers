import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.date = new Date();
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
      let object = this.itemMaster.value;
      if (this.submitButton == 'Submit') {
        let formData = new FormData();
        let json: any = {};
        let materialConstrution: any = [];


        json = {
          itemName: object['itemCode'],
          rawPartWeight: object['rawPartWeight']
        }
      }
    }
  }
}
