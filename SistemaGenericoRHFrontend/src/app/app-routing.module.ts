import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'', redirectTo: '/bienvenidos', pathMatch: 'full'},
  {path:'bienvenidos', component: BienvenidaComponent}, 
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'**', redirectTo: '/bienvenidos', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
