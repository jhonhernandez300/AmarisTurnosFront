import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TurnoService } from '../../servicios/turno.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iTurnoSinId } from '../../interfaces/iTurnoSinId';
import { LocalStorageService } from '../../servicios/local-storage.service';

@Component({
  selector: 'app-guardar-turno',
  templateUrl: './guardar-turno.component.html',
  styleUrls: ['./guardar-turno.component.css']
})
export class GuardarTurnoComponent {
  turnoForm: FormGroup = this.formBuilder.group({});
  submitted = false;
  errorMessage: string = '';
  mostrarFechaYHora = false;
  mostrarCrearTurno = true;
  turno = 0;
  fechaYhora: Date = new Date('2000-01-01T12:00:00');
  showDiv = false;

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private router: Router,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.turnoForm = this.formBuilder.group({});
  }

  private showTemporaryDiv(): void {
    this.showDiv = true;
    setTimeout(() => this.showDiv = false, 5000);
  }

  public onReset(): void {
    this.submitted = false;
    this.turnoForm.reset();
  }

  private contarTurnos(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.turnoService.ContarTurnos(id).subscribe(
        response => {
          console.log('ContarTurnos response:', response); 
          resolve(response.numeroDeTurnos);  
        },
        error => {
          this.handleError(error);
          resolve(-1);  
        }
      );
    });
  }
  
  public async onSubmit(): Promise<void> {
    this.submitted = true;
    this.errorMessage = '';
    const id = this.localStorageService.getData("id");
  
    // Esperando la respuesta
    const cantidad = await this.contarTurnos(id); 
    console.log(cantidad);

    if(cantidad <= 5) {
      this.createTurno();
    }else{
      this.handleError({ message: "El usuario ya tiene 5 turnos." });
    }         
  }
  
  private createTurno(): void {
    const turno: iTurnoSinId = this.buildTurno();
    this.turnoService.Crear(turno).subscribe(
      response => this.handleSuccess(response),
      error => this.handleError(error)
    );
  }

  private buildTurno(): iTurnoSinId {
    return {
      IdUsuario: this.localStorageService.getData("id"),
      IdSucursal: 1,
      FechaTurno: new Date(),
      Estado: "Creado"
    };
  }

  private handleSuccess(response: any): void {
    this.fechaYhora = new Date();
    this.turno = this.localStorageService.getData("id");
    this.mostrarFechaYHora = true;
    this.mostrarCrearTurno = false;
    this.cdr.detectChanges();
  }

  private handleError(error: { message: string }): void {
    console.error('Error:', error.message);
    this.errorMessage = error.message || 'Error desconocido';
    this.showTemporaryDiv();
  }
}
