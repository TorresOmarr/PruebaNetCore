import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Guards
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:'', redirectTo: '/bienvenidos', pathMatch: 'full'},
  {path:'bienvenidos', component: BienvenidaComponent}, 
  {path:'login', component:LoginComponent},
  {path:'dashboard', canActivate: [AuthGuard] , component:DashboardComponent},
  {path:'**', redirectTo: '/bienvenidos', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
