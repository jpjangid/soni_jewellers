import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiServiceService } from '../api-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AppUtility } from './appUtitlity';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiServiceService , private router : Router , private _utility : AppUtility) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if account is logged in and request is to the api url
    let url = environment.base_url;
    console.log(url + 'User/jewellerslogin');
    if ((request.url === url + 'User/jewellerslogin')) {
      return next.handle(request);
    }

    else {
      var token: any = JSON.parse(localStorage.getItem('UserObject'));
      const isLoggedIn = (token) ? true : false;
      const isApiUrl = request.url.startsWith(environment.base_url);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token.token}` }
        });
      }
      return next.handle(request)
      .pipe(catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
          if (err.status === 400) {
            if (Object.values(err.error)[0][0]) {
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
            }
            else if(err.error) {
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
            }
          }
          if (err.status === 500) {
            if (err.error.message == 'Object reference not set to an instance of an object') {
              localStorage.clear();
              this.router.navigateByUrl('/login');
            }

            else{
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
            }
          }
    
          if(err.status === 415){
            if (err.error) {
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
              console.log(err.error);
            }
          }
      return throwError(err);
    }));
    }
  }
}
