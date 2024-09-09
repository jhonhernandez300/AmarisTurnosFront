import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { GuardarTurnoComponent } from './components/guardar-turno/guardar-turno.component';
import { BuscarTurnoPorIdComponent } from './components/buscar-turno-por-id/buscar-turno-por-id.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GuardarTurnoComponent,
    BuscarTurnoPorIdComponent
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
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
