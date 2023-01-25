import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private router : ActivatedRoute , private route : Router , private _apiService : ApiServiceService , private commonFunction : AppUtility) { }

  user : any = {};
  ngOnInit(): void {
    this.commonFunction.loader(true);
    let id = this.router.snapshot.params;
    if(id.id){
      this._apiService.getRegisteredUserById(id.id).then((res:any)=>{
        console.log(res);
        if(res.success){
          this.commonFunction.loader(false);
          this.user = res.returnValue;
        }

        else{
          this.commonFunction.loader(false);
          this.route.navigateByUrl('/notFound');
        }
      })
    }
  }


  print(){
    window.print();
  }

}
