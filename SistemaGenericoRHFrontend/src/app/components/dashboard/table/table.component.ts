import {AfterViewInit, Component,OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RegisterComponent } from '../../inicio/register/register.component';
import { RegisterUserDto } from 'src/app/models/registerUserDto';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'correo', 'usuario', 'sexoDescripcion', 'estatus', 'action'];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private usuarioService: UsuarioService, private tost: NgToastService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuarioService.consultarUsuarios().subscribe(
      {
        next:(res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(error) =>{

        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarUsuario(row : RegisterUserDto){
    this.dialog.open(RegisterComponent, {
      height: 'auto',
      width: '500px',
      data: row
    }).afterClosed().subscribe(val => {     
        this.obtenerUsuarios();      
    })
  }

  eliminarUsuario(id: number){
    this.usuarioService.eliminarUsuario(id).subscribe({
      next:(res) => {
        this.tost.success({ detail: "Exito!", summary: res.message, duration: 4000 }); 
        this.obtenerUsuarios();       
      },error: (error) => {
        this.tost.error({ detail: "Hubo un error!", summary: error.error.message, duration: 4000 });
      }
    })
  }

  
}
