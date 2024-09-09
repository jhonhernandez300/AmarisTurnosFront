import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { GuardarTurnoComponent } from '../app/components/guardar-turno/guardar-turno.component';
import { BuscarTurnoPorIdComponent } from '../app/components/buscar-turno-por-id/buscar-turno-por-id.component';
import { BuscarTurnosActivosComponent } from '../app/components/buscar-turnos-activos/buscar-turnos-activos.component';

const routes: Routes = [
  { path: 'buscar-turnos-activos', component: BuscarTurnosActivosComponent },
  { path: 'buscar-turno-por-id', component: BuscarTurnoPorIdComponent },
  { path: 'guardar-turno', component: GuardarTurnoComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
  { path: '', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
