import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iUsuarioCorto } from '../interfaces/iUsuarioCorto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  lastDate: any;  
  fechaHoraActual: Date = new Date();  
  private apiUrl = 'https://localhost:7202/api'; 

  constructor(private http: HttpClient) { }

  IsAuthenticated(): boolean{  
    const lastDate = localStorage.getItem('last date');      
    //console.log("lastDate ", lastDate);

    if (lastDate === null) {   
      this.lastDate = new Date(1900, 0, 1, 0, 0, 0); 
    }else {
      this.lastDate = new Date(lastDate);
    }  
  
    const fechaHoraActual = new Date();
    const diferenciaMs = this.lastDate.getTime() - this.fechaHoraActual.getTime(); 
       
      // Convertir la diferencia de milisegundos a minutos
    const diferenciaMinutos = diferenciaMs / (1000 * 60);  
    //console.log("(-1 * diferenciaMinutos) ", (-1 * diferenciaMinutos));
      // Comprobar si la diferencia es mayor a 20 minutos
    if((-1 * diferenciaMinutos) > 20)  {
      return false;
    }else{
      return true;
    }   
  }

  Login(usuarioCorto: iUsuarioCorto): Observable<any> {         
    return this.http.post(`${this.apiUrl}/Usuario/Login`, usuarioCorto).pipe(
      catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
      })    
    );    
  }
}
