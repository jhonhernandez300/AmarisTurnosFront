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
    if (this.myForm.valid) {
      this.obtenerTurnoPorId(this.myForm.value.Turno);
    }
  }

  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
    this.mostrarTabla = false;
  }

  openErrorModal(): void {
    this.modalService.open('#errorModal');
  }

  activarTurno(): void {
    this.actualizarEstadoTurno("Activado", "atender");
  }

  atenderTurno(): void {
    this.actualizarEstadoTurno("Atendido", "ninguno");
  }

  // Métodos auxiliares:

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

  private mostrarError(error: any): void {
    this.errorMessage = error;
    this.openErrorModal();
  }
}
