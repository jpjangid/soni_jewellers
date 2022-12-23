import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    loginUser : new FormControl('' , [Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    loginPassword : new FormControl('' , [Validators.required])
  })


  loginUser(){
    console.log(this.loginForm.valid);
  }

}
