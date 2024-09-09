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
  selector: 'app-buscar-turno-por-id',
  templateUrl: './buscar-turno-por-id.component.html',
  styleUrl: './buscar-turno-por-id.component.css'
})
export class BuscarTurnoPorIdComponent implements OnInit{
  myForm: FormGroup = this.formBuilder.group({});
  submitted = false;   
  errorMessage: string = '';
  mostrarTabla: boolean = false;
  botonAMostrar: string = "ninguno";

  turnoEncontrado: iTurnoConId = {
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
    ){      
    }

  iniciarFormulario(){
    this.myForm = this.formBuilder.group({                   
      Turno: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  get form(): { [key: string]: AbstractControl; }
  {
        return this.myForm.controls;
  }
  
  onReset(): void {
      this.submitted = false;
      this.myForm.reset();   
      this.mostrarTabla = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log("Form value ", this.myForm.value);            

    if (this.myForm.valid) {      

      this.turnoService.ObtenerPorId(this.myForm.value.Turno).subscribe(
        (response: any) => {
          //console.log('response', response);
          this.turnoEncontrado.IdUsuario = response.turno.idUsuario;
          this.turnoEncontrado.IdSucursal = response.turno.idSucursal;
          this.turnoEncontrado.IdTurno = response.turno.idTurno;
          this.turnoEncontrado.FechaTurno = response.turno.fechaTurno;
          this.turnoEncontrado.Estado = response.turno.estado;

          if(this.turnoEncontrado.Estado == "Creado"){
            this.botonAMostrar = "activar";
          }else if(this.turnoEncontrado.Estado == "Activado"){
            this.botonAMostrar = "atender";
          }
          //console.log('this.turnoEncontrado ', this.turnoEncontrado);
          this.mostrarTabla = true;
        },
        (error: any) => {
          console.error('Error:', error);
          this.errorMessage = error;
          this.openErrorModal();
        }
      );
    }
  }  

  openErrorModal() {
    this.modalService.open('#errorModal'); 
  }

  activarTurno(){
    this.turnoEncontrado.Estado = "Activado";
    this.turnoService.ActualizarTurno(this.turnoEncontrado).subscribe(
      (response: any) => {
        //console.log('response', response);    

        if(this.turnoEncontrado.Estado == "Activado"){
          this.botonAMostrar = "atender";
        }
        this.onReset();
      },
      (error: any) => {
        console.error('Error:', error);
        this.errorMessage = error;
        this.openErrorModal();
      }
    );
  }

  atenderTurno(){
    this.turnoEncontrado.Estado = "Atendido";
    this.turnoService.ActualizarTurno(this.turnoEncontrado).subscribe(
      (response: any) => {          
        this.botonAMostrar = "ninguno";  
        this.onReset();      
      },
      (error: any) => {
        console.error('Error:', error);
        this.errorMessage = error;
        this.openErrorModal();
      }
    );
  }
}
