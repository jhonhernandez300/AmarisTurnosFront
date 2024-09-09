import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TurnoService } from '../../servicios/turno.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iTurnoSinId } from '../../interfaces/iTurnoSinId';
import { LocalStorageService } from '../../servicios/local-storage.service';

@Component({
  selector: 'app-guardar-turno',
  templateUrl: './guardar-turno.component.html',
  styleUrl: './guardar-turno.component.css'
})
export class GuardarTurnoComponent implements OnInit {
  turnoForm: FormGroup = this.formBuilder.group({});
  submitted = false;
  errorMessage: string = '';
  mostrarFechaYHora: boolean = false;
  mostrarCrearTurno: boolean = true;
  turno: number = 0;
  fechaYhora: Date = new Date('2000-01-01T12:00:00');

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private router: Router,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.iniciarFormulario();
  }

  iniciarFormulario() {
    // this.turnoForm = this.formBuilder.group({      
    //   FechaTurno: ['', Validators.required],
    //   Estado: ['', Validators.required]
    // });
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.turnoForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.turnoForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    // if (this.turnoForm.valid) {
      const turno: iTurnoSinId = {
        IdUsuario: this.localStorageService.getData("id"),
        IdSucursal: 1,
        FechaTurno: new Date(),
        Estado: "Creado"
      };

      this.turnoService.Crear(turno).subscribe(
        (response: any) => {
          console.log('Turno creado exitosamente', response);  
          this.fechaYhora = turno.FechaTurno;
          this.turno = turno.IdUsuario;
          this.mostrarFechaYHora = true;
          this.mostrarCrearTurno  = false;
          this.cdr.detectChanges();
          console.log(this.mostrarCrearTurno);
        },
        (error: any) => {
          console.error('Error:', error);
          this.errorMessage = error.message || 'Error desconocido';
          this.openErrorModal();
        }
      );
   // }
  }

  openErrorModal() {
    this.modalService.open('#errorModal');
  }
}
