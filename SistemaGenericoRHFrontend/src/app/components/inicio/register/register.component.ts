import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { RegisterUserDto } from 'src/app/models/registerUserDto';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;
  actionBtn: string = "Guardar";
  header: string = "Alta Usuario"

  public hide: boolean = true;
  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private tost: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: RegisterUserDto
  ) {

  }

  ngOnInit(): void {
    this.register = this.fb.group({
      id: new FormControl({value: '', disabled: true}),
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(7), Validators.pattern("(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,25}")]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A - Za - z])(?=.*\\d)(?=.*[@$!% *#?&])[A-Za-z\\d@$!%*#?&]{10,25}')]],
      confirmPassword: ['', Validators.required],
      sexo: [undefined, Validators.required],

    }, {

      validator: this.checkPassword
    });


    if (this.editData) {

      this.cargarDataUsuarioEditar();
    }

  }

  cargarDataUsuarioEditar() {
    this.actionBtn = "Actualizar";
    this.header = "Actualizar Usuario";
    this.register.controls['id'].setValue(this.editData.id?.toString());
    this.register.controls['correo'].setValue(this.editData.correo);
    this.register.controls['usuario'].setValue(this.editData.usuario);
    this.register.controls['sexo'].setValue(this.editData.sexoId?.toString());

    console.log(this.register.controls['id'].value)
  }

  registarUsuario(): void {   
    if (!this.register.invalid) {
      const usuario: RegisterUserDto = this.cargarDatosUsuario();
      console.log(usuario);
      if(this.editData){
        this.actualizarUsuario(usuario);
      }else{
        this.agregarUsuario(usuario);
      }
     

    }
  }

  cargarDatosUsuario(): RegisterUserDto {
  
    const usuario: RegisterUserDto = {
      correo: this.register.controls["correo"].value,
      usuario: this.register.controls["usuario"].value,
      contraseña: this.register.controls["password"].value,
      sexoId: this.register.controls["sexo"].value,
      id: this.editData ? this.editData.id: undefined
    }
    return usuario;
  }

  agregarUsuario(usuario: RegisterUserDto): void {
    this.usuarioService.registrarUsuario(usuario).subscribe(
      res => {
        console.log(res)
        this.tost.success({ detail: "Exito!", summary: res.message, duration: 4000 });
        this.dialogRef.close('agregar');
      },
      error => {
        this.tost.error({ detail: "Hubo un error!", summary: error.error.message, duration: 4000 });
        
       
      }
    )
  }

  actualizarUsuario(usuario: RegisterUserDto) {
    this.usuarioService.actualizarUsuario(usuario).subscribe({
      next:(res) => {
        this.tost.success({ detail: "Exito!", summary: res.message, duration: 4000 });
        this.dialogRef.close('actualizar');
      },error:error =>{
        console.log(error);
        this.tost.error({ detail: "Hubo un error!", summary: error.error.message, duration: 4000 });
      }
    })
  }

  checkPassword(group: FormGroup): any {

    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }



}
