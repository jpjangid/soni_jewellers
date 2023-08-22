import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { AppUtility } from 'src/app/interceptor/appUtitlity';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  image: any;

  constructor(private router : ActivatedRoute , private sanitizer: DomSanitizer, private route : Router , private _apiService : ApiServiceService , private commonFunction : AppUtility) { }
  // @ViewChild('image') image : ElementRef
  user : any = {};
  QRCode : any ;
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

      this._apiService.getBarCodeById(id.id).then((res:any)=>{
        var blob = new Blob([res], { type: '.jpeg' });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        console.log(imageUrl);
      })
    }
  }


  url : any;
  print(){
    window.print();
  }

}
