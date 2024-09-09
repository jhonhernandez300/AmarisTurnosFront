import { Component, OnInit } from '@angular/core';
import { TurnoService } from '../../servicios/turno.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iTurnoConId } from '../../interfaces/iTurnoConId';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../servicios/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-turnos-activos',
  templateUrl: './buscar-turnos-activos.component.html',
  styleUrl: './buscar-turnos-activos.component.css'
})
export class BuscarTurnosActivosComponent implements OnInit{
  errorMessage: string = '';
  mostrarTablaDetalle: boolean = false;
  botonAMostrar: string = "ninguno";
  turnos:iTurnoConId[] = [];

  turnoSeleccionado: iTurnoConId = {
    IdTurno: 0,
    IdUsuario: 0,
    IdSucursal: 0,
    FechaTurno: new Date(),
    Estado: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private turnoService: TurnoService
  ){}

  ngOnInit(): void {
    this.turnoService.ObtenerTurnosActivados().subscribe(
      (response: any) => {
        console.log('response', response);
        this.turnos = response.map((turno: any) => ({
          IdTurno: turno.idTurno,
          IdUsuario: turno.idUsuario,
          IdSucursal: turno.idSucursal,
          FechaTurno: new Date(turno.fechaTurno),
          Estado: turno.estado
        }));
      },
      (error: any) => {
        console.error('Error:', error);
        this.errorMessage = error;
        this.openErrorModal();
      }
    );
  }

  openErrorModal() {
    this.modalService.open('#errorModal'); 
  }

  atenderTurno(turno: iTurnoConId){
    turno.Estado = "Atendido";
    this.turnoService.ActualizarTurno(turno).subscribe(
      (response: any) => {          
        this.turnoService.ObtenerTurnosActivados().subscribe(
          (response: any) => {
            console.log('response', response);
            this.turnos = response.map((turno: any) => ({
              IdTurno: turno.idTurno,
              IdUsuario: turno.idUsuario,
              IdSucursal: turno.idSucursal,
              FechaTurno: new Date(turno.fechaTurno),
              Estado: turno.estado
            }));
          },
          (error: any) => {
            console.error('Error:', error);
            this.errorMessage = error;
            this.openErrorModal();
          }
        );     
      },
      (error: any) => {
        console.error('Error:', error);
        this.errorMessage = error;
        this.openErrorModal();
      }
    );
  }  
}
