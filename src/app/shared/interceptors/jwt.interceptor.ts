import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('test from interceptor');
    if(request.url.startsWith(environment.apiUrl)){
    //here you can send your headers
    request = request.clone({
      setHeaders:
      {'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFiaGFyd29ya3MuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NjYzNzQ5NzYsImV4cCI6MTY2NjM3ODU3Nn0.oK_CQt8n8k-GACvbUBSgt3T-7Qx5YVo8Op-EpnEuso8'}
    });
  }
    return next.handle(request);
  }
}
