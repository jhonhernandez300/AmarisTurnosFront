import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iUsuarioCorto } from '../interfaces/iUsuarioCorto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:7202/api'; 

  constructor(private http: HttpClient) { }

  Login(usuarioCorto: iUsuarioCorto): Observable<any> {         
    return this.http.post(`${this.apiUrl}/Usuario/Login`, usuarioCorto).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }
}
