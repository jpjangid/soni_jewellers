import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  loginAuth : any;
  authorizedflag : boolean = false;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.loginAuth = localStorage.getItem('UserObject');
    this.loginAuth = JSON.parse(this.loginAuth);
    let roles = route.data.roles as Array<string>;
    this.authorizedflag = false;
    if(this.loginAuth){
        for(let i=0 ; i < roles?.length; i++){
          if(this.loginAuth?.userName == roles[i]){
            this.authorizedflag = true;
          }
        }

        if(this.authorizedflag){
          return true;
        }
    
        else{
          this.router.navigateByUrl('/billGenerate');
          return false;
        }
    }

    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
