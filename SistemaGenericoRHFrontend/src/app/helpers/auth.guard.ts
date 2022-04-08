import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NgToastService, NgToastModule } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private loginService: LoginService, private toast: NgToastService){
NgToastModule
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.getToken() == null){
        console.log("Ruta Protegida")
        this.toast.warning({detail: "Acceso Denegado!", summary:"Inicie Sesion. ", duration:4000 });
        this.router.navigate(['/login']);
      }


    return true;
  }
  
}
