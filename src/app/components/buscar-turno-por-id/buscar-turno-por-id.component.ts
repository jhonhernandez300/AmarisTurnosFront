import { Component, OnInit } from '@angular/core';
import { TurnoService } from '../../servicios/turno.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iTurnoConId } from '../../interfaces/iTurnoConId';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-turno-por-id',
  templateUrl: './buscar-turno-por-id.component.html',
  styleUrl: './buscar-turno-por-id.component.css'
})
export class BuscarTurnoPorIdComponent implements OnInit {
  myForm: FormGroup = this.formBuilder.group({});
  submitted = false;
  errorMessage: string = '';
  mostrarTabla: boolean = false;
  botonAMostrar: string = "ninguno";
  showDiv: boolean = false;
  
  turnoEncontrado: iTurnoConId = this.resetTurnoEncontrado();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.myForm = this.formBuilder.group({
      Turno: ['', [Validators.required]]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.showDiv = false;

    if (this.myForm.valid) {
      this.obtenerTurnoPorId(this.myForm.value.Turno);
    }
  }

  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
    this.mostrarTabla = false;
    this.showDiv = false;
  } 

  private turnoConMasDe15Minutos(): boolean{
    // Fecha y hora del turno en milisegundos
    const fechaTurno = new Date(this.turnoEncontrado.FechaTurno).getTime(); 
    const fechaActual = new Date().getTime(); 
    // Diferencia en minutos
    const diferenciaMinutos = Math.abs(fechaActual - fechaTurno) / (1000 * 60); 

      if (diferenciaMinutos <= 15) {
        return false;
    } else {
        return true;
    }
  }

  activarTurno(): void {
      if (this.turnoConMasDe15Minutos() == false) {
        this.actualizarEstadoTurno("Activado", "atender");
    } else {
      this.actualizarEstadoTurno("Expirado", "ninguno")
      this.errorMessage = "El turno tiene más de 15 minutos, solicite uno nuevo";
      this.showDiv = true;
    }
  }  

  atenderTurno(): void {
    this.actualizarEstadoTurno("Atendido", "ninguno");
  }

  private actualizarEstadoTurno(nuevoEstado: string, nuevoBoton: string): void {
    this.turnoEncontrado.Estado = nuevoEstado;
    this.turnoService.ActualizarTurno(this.turnoEncontrado).subscribe(
      () => {
        this.botonAMostrar = nuevoBoton;
        this.onReset();
      },
      (error: any) => {
        this.mostrarError(error);
      }
    );
  }  

  private resetTurnoEncontrado(): iTurnoConId {
    return {
      IdTurno: 0,
      IdUsuario: 0,
      IdSucursal: 0,
      FechaTurno: new Date(),
      Estado: ''
    };
  }

  private obtenerTurnoPorId(turnoId: number): void {
    this.turnoService.ObtenerPorId(turnoId).subscribe(
      (response: any) => {
        this.asignarDatosTurno(response.turno);
        this.configurarBotonAMostrar();
        this.mostrarTabla = true;
      },
      (error: any) => {
        this.mostrarError(error);
      }
    );
  }

  private asignarDatosTurno(turno: any): void {
    this.turnoEncontrado = {
      IdTurno: turno.idTurno,
      IdUsuario: turno.idUsuario,
      IdSucursal: turno.idSucursal,
      FechaTurno: turno.fechaTurno,
      Estado: turno.estado
    };
  }

  private configurarBotonAMostrar(): void {
    if (this.turnoEncontrado.Estado === "Creado") {
      this.botonAMostrar = "activar";
    } else if (this.turnoEncontrado.Estado === "Activado") {
      this.botonAMostrar = "atender";
    }
  }

  showTemporaryDiv() {
    this.showDiv = true; 
    setTimeout(() => {
      this.showDiv = false; 
    }, 5000);
  }

  private mostrarError(error: any): void {
    this.errorMessage = error;
    this.showDiv = true;
  }
}
