import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private apiService : ApiServiceService , private utility : AppUtility , private router : Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    loginUser : new FormControl('' , [Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    loginPassword : new FormControl('' , [Validators.required])
  })


  loginUser(loginPage : NgForm){
    console.log(this.loginForm.valid);
    if(this.loginForm.valid){
      this.utility.loader(true);
      let object = {
        loginName : this.loginForm.value.loginUser, 
        loginPassword : this.loginForm.value.loginPassword
      }
      this.apiService.login(object).then((res:any)=>{
        console.log(res.returnValue);
        this.utility.loader(false);
        localStorage.setItem('UserObject' , JSON.stringify(res.returnValue))
        if(res.status){
          this.apiService.showMessage(res.message , 'success');
          this.loginForm.reset();
          Object.keys(this.loginForm.controls).forEach((key:any)=>{
            this.loginForm.controls[key].setErrors(null);
          })
          loginPage.resetForm();
          this.router.navigateByUrl('billGenerate')
        }

        else{
          this.apiService.showMessage(res.message , 'error');
        }
      })
    }
  }

}
