import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { GuardarTurnoComponent } from '../app/components/guardar-turno/guardar-turno.component';
import { BuscarTurnoPorIdComponent } from '../app/components/buscar-turno-por-id/buscar-turno-por-id.component';
import { BuscarTurnosActivosComponent } from '../app/components/buscar-turnos-activos/buscar-turnos-activos.component';
import { authGuard } from '../app/helpers/auth.guard';

const routes: Routes = [
  { path: 'buscar-turnos-activos', component: BuscarTurnosActivosComponent, canActivate: [authGuard]},
  { path: 'buscar-turno-por-id', component: BuscarTurnoPorIdComponent , canActivate: [authGuard]},
  { path: 'guardar-turno', component: GuardarTurnoComponent , canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
