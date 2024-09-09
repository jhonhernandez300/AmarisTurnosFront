import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iTurnoSinId } from '../interfaces/iTurnoSinId';
import { catchError } from 'rxjs/operators';
import { iTurnoConId } from '../interfaces/iTurnoConId';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'https://localhost:7202/api'; 

  constructor(private http: HttpClient) { }

  ObtenerTurnosActivados(): Observable<any> {         
    return this.http.get(`${this.apiUrl}/Turno/ObtenerTurnosActivados`).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }

  ActualizarTurno(turno: iTurnoConId): Observable<any> {    
    console.log(turno);     
    return this.http.put(`${this.apiUrl}/Turno/ActualizarTurno`, turno).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }

  Crear(iTurnoSinId: iTurnoSinId): Observable<any> {         
    return this.http.post(`${this.apiUrl}/Turno/CrearTurno`, iTurnoSinId).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }

  ObtenerPorId(idTurno: number): Observable<any> {         
    return this.http.get(`${this.apiUrl}/Turno/ObtenerTurnoPorId` + "/" + idTurno).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }
}
