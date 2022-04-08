import { EventEmitter, Injectable } from '@angular/core';
import { RegisterUserDto } from '../models/registerUserDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  environment } from '../../environments/environment'
import { Usuario } from '../models/usuario';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myAppUrl!: string;
  myApiUrl!:string;
  constructor( private http : HttpClient ) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "api/User/";
  }

  $emitter = new EventEmitter();

  
  registrarUsuario(registerUserDto: RegisterUserDto): Observable<Respuesta>{
    return this.http.post<Respuesta>(this.myAppUrl + this.myApiUrl + 'CrearUsuario', registerUserDto )
  }

  consultarUsuarios(): Observable<Usuario[]>{ 
    return this.http.get<Usuario[]>(this.myAppUrl + this.myApiUrl + 'Usuarios');
    
  }

  actualizarUsuario(user: RegisterUserDto): Observable<Respuesta>{
    return this.http.put<Respuesta>(this.myAppUrl + this.myApiUrl + user.id, user);
  }

  eliminarUsuario(id: number): Observable<Respuesta>{
    return this.http.delete<Respuesta>(this.myAppUrl + this.myApiUrl + id);
  }



}
