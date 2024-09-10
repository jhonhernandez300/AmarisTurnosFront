import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { GuardarTurnoComponent } from './components/guardar-turno/guardar-turno.component';
import { BuscarTurnoPorIdComponent } from './components/buscar-turno-por-id/buscar-turno-por-id.component';
import { BuscarTurnosActivosComponent } from './components/buscar-turnos-activos/buscar-turnos-activos.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthInterceptor } from '../app/servicios/authInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GuardarTurnoComponent,
    BuscarTurnoPorIdComponent,
    BuscarTurnosActivosComponent,
    MenuComponent
  ],
  imports: [                
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,    
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
    // StoreModule.forRoot({}), 
    // EffectsModule.forRoot([]), 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
