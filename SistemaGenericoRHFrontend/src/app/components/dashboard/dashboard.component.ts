import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../inicio/register/register.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
      console.log(`Dialog result: ${result}`);
    });
  }


}
