import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err=>{
      console.log(err);
      //here you can handle your errors
      //if return 401 or 403 errors
      if([401,403].indexOf(err.status) !== -1){
        console.log('Error is 401 from interceptor');
        this.router.navigate(['../auth/login']);
      }
      return throwError(err);
    }));
  }
}
