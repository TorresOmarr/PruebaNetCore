import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterUserDto } from '../models/registerUserDto';
import { Usuario } from '../models/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl!: string;
  myApiUrl!: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "api/User/Login";
  }

  login(user: RegisterUserDto): Observable<Usuario> {
    return this.http.post<Usuario>(this.myAppUrl + this.myApiUrl, user);
  }

  setLocalStorage(data: Usuario): void {
    localStorage.setItem('token', data.token!);
  }

  /*
    getNombreUsuario(): string|null {
      return localStorage.getItem('nombreUsuario');
    }
  */

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token') || undefined);
    return decodedToken;
  }  
  
}
