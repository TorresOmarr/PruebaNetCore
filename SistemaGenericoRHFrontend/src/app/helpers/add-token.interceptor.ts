import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toast: NgToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({setHeaders: { Authorization: `Bearer ${token}` }})
    }
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status === 401){
          this.toast.error({detail: "Sesion Expirada!", summary: 'por favor vuelva a loguearse', duration:4000 });
          this.router.navigate(['/login'])
        }
        return throwError(error);
      })
    );
  }
}
