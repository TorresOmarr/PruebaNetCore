import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../inicio/register/register.component';
import { LoginService } from '../../services/login.service';
import { TableComponent } from './table/table.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('tabla') hijo!: TableComponent;

  constructor(public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    console.log(this.loginService.getTokenDecoded());
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: 'auto',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.hijo.obtenerUsuarios();
      console.log(`Dialog result: ${result}`);
    });
  }

  removerToken(){
    this.loginService.removeToken();
  }


}
