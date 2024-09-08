import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iTurnoSinId } from '../interfaces/iTurnoSinId';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'https://localhost:7202/api'; 

  constructor(private http: HttpClient) { }

  Crear(iTurnoSinId: iTurnoSinId): Observable<any> {         
    return this.http.post(`${this.apiUrl}/Turno/Crear`, iTurnoSinId).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }
}
