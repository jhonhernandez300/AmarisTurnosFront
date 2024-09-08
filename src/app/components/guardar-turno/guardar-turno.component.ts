import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TurnoService } from '../../servicios/turno.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iTurnoSinId } from '../../interfaces/iTurnoSinId';

@Component({
  selector: 'app-guardar-turno',
  templateUrl: './guardar-turno.component.html',
  styleUrl: './guardar-turno.component.css'
})
export class GuardarTurnoComponent implements OnInit {
  turnoForm: FormGroup = this.formBuilder.group({});
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private router: Router,
    private modalService: NgbModal
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
        IdUsuario: 1,
        IdSucursal: 1,
        FechaTurno: new Date(),
        Estado: "Creado"
      };

      this.turnoService.Crear(turno).subscribe(
        (response: any) => {
          console.log('Turno creado exitosamente', response);          
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
