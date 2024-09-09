import { Component, OnInit } from '@angular/core';
import { TurnoService } from '../../servicios/turno.service';
import { iTurnoConId } from '../../interfaces/iTurnoConId';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-turnos-activos',
  templateUrl: './buscar-turnos-activos.component.html',
  styleUrls: ['./buscar-turnos-activos.component.css']
})
export class BuscarTurnosActivosComponent implements OnInit {
  errorMessage: string = '';
  mostrarTablaDetalle: boolean = false;
  botonAMostrar: string = "ninguno";
  turnos: iTurnoConId[] = [];
  showDiv = false;

  turnoSeleccionado: iTurnoConId = {
    IdTurno: 0,
    IdUsuario: 0,
    IdSucursal: 0,
    FechaTurno: new Date(),
    Estado: ''
  };

  constructor(
    private turnoService: TurnoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadActiveTurns();
  }

  private loadActiveTurns(): void {
    this.turnoService.ObtenerTurnosActivados().subscribe(
      (response: any) => {
        if (response.message === "No hay turnos activados.") {
          this.handleEmptyTurns(response.message);
        } else {
          this.updateTurnos(response);
        }
      },
      (error: any) => this.handleError(error)
    );
  }

  private handleEmptyTurns(message: string): void {
    this.errorMessage = message;
    this.showTemporaryDiv();
  }

  private updateTurnos(turnosData: any): void {
    this.turnos = turnosData.map((turno: any) => ({
      IdTurno: turno.idTurno,
      IdUsuario: turno.idUsuario,
      IdSucursal: turno.idSucursal,
      FechaTurno: new Date(turno.fechaTurno),
      Estado: turno.estado
    }));
  }

  private showTemporaryDiv(): void {
    this.showDiv = true;
    setTimeout(() => this.showDiv = false, 5000);
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = error;
    this.showTemporaryDiv();
  }

  atenderTurno(turno: iTurnoConId): void {
    this.updateTurnoState(turno, "Atendido");
  }

  private updateTurnoState(turno: iTurnoConId, estado: string): void {
    turno.Estado = estado;
    this.errorMessage = "";
    this.turnoService.ActualizarTurno(turno).subscribe(
      () => this.refreshActiveTurns(),
      (error: any) => this.handleError(error)
    );
  }

  private refreshActiveTurns(): void {
    this.turnoService.ObtenerTurnosActivados().subscribe(
      (response: any) => {
        if (response.message === "No hay turnos activados.") {
          this.handleEmptyTurns(response.message);
          this.turnos = [];
        } else {
          this.updateTurnos(response);
        }
      },
      (error: any) => this.handleError(error)
    );
  }
}
