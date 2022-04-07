import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { ComponentFixture } from '@angular/core/testing';
import { RegisterUserDto } from '../../../models/registerUserDto';
import { LoginService } from '../../../services/login.service';
import { NgToastService } from 'ng-angular-popup'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login!: FormGroup;
hide: boolean = true;
  constructor(private fb: FormBuilder, private loginService: LoginService,private router: Router, private tost: NgToastService) {
    this.login = this.fb.group({
      correo:['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[A - Za - z])(?=.*\\d)(?=.*[@$!% *#?&])[A-Za-z\\d@$!%*#?&]{10,25}')]]
    })
   }

  ngOnInit(): void {
  }

  log(): void{ 

    const usuario: RegisterUserDto = {
      contraseña: this.login.value.password,
      correo: this.login.value.correo      
    }

    this.loginService.login(usuario).subscribe( 
      data =>{        
        this.tost.success({detail: "Exito!", summary: "Bienvenido de nuevo " + data.usuario, duration:4000 });
        this.loginService.setLocalStorage(data);
        this.router.navigate(['dashboard']);
      },
      error =>{    
        this.tost.error({detail: "Hubo un error!", summary: error.error.message, duration:4000 });
      }
    );
  }

}
