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
    this.itemMaster.controls['itemDate'].setValue(this.myDate);
  }

  breadcrumb = [
    {
      title: 'Part Master',
      subTitle: 'Dashboard'
    }
  ]

  itemMaster = this.fb.group({
    // itemName: new FormControl('', [Validators.required]),
    itemDate: new FormControl('', [Validators.required]),
    itemDesc: new FormControl('', [Validators.required]),
    itemCode: new FormControl('', [Validators.required]),
    unitName: new FormControl('', [Validators.required]),
    materialOfConstruction: this.fb.array([], Validators.required),
    rawPartWeight: new FormControl(''),
    finishPartWeight: new FormControl(''),
    enggDrawing: new FormControl('')
  })

  mocBoolean: boolean = false;
  getSelectedMOC() {
    this.mocBoolean = false;
  }

  itemMasterSubmit(itemMaster: FormGroupDirective) {
    this.mocBoolean = false;

    if (this.itemMaster.valid && this.mocBoolean) {
      let object = this.itemMaster.value;
      if (this.submitButton == 'Submit') {
        let formData = new FormData();
        let json: any = {};
        let materialConstrution: any = [];


        json = {
          itemMaterialconstructionDetails: materialConstrution,
          itemName: object['itemCode'],
          itemDate: object['itemDate'],
          itemCode: object['itemCode'],
          itemDesc: object['itemDesc'],
          unitName: object['unitName'],
          rawPartWeight: object['rawPartWeight'],
          finishPartWeight: object['finishPartWeight']
        }
      }
    }
  }
}
