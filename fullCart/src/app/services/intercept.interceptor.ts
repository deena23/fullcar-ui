import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers= new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', localStorage.getItem('Token') ? `Bearer ${localStorage.getItem('Token')}` : '');

      const req = request.clone({
        headers: headers
      })
      return next.handle(req);
  }
}
