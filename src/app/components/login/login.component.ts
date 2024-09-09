import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iUsuarioCorto } from '../../interfaces/iUsuarioCorto';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../servicios/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  myForm: FormGroup = this.formBuilder.group({});
  submitted = false; 
  emailChecked = false;
  errorMessage: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private router: Router
    ){      
    }

    iniciarFormulario(){
      this.myForm = this.formBuilder.group({                   
        Password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        CorreoElectronico: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.minLength(5), Validators.maxLength(30)]]
      });
    }
    
    ngOnInit(): void {
      this.iniciarFormulario();
    }

    validarContrasena(control: any) {
      const contrasena = control.value;
      const tieneMayuscula = /[A-Z]/.test(contrasena);
      const tieneMinuscula = /[a-z]/.test(contrasena);
      const tieneNumero = /\d/.test(contrasena);
  
      const esValido = tieneMayuscula && tieneMinuscula && tieneNumero;
  
      return esValido ? null : { 'contrasenaInvalida': true };
    }
  
    get form(): { [key: string]: AbstractControl; }
    {
        return this.myForm.controls;
    }

    onReset(): void {
      this.submitted = false;
      this.myForm.reset();          
      this.emailChecked = false;
    }
  

  onSubmit() {
    this.submitted = true;
    //console.log("Form value ", this.myForm.value);            

    if (this.myForm.valid) {
      const usuarioCorto: iUsuarioCorto = {
        Correo: this.myForm.value.CorreoElectronico,
        Password: this.myForm.value.Password
      };

      this.usuarioService.Login(usuarioCorto).subscribe(
        (response: any) => {
          //console.log('response', response);
          this.localStorageService.setData('token', response.token);
          this.localStorageService.setData('id', response.idUsuario);
          this.router.navigate(['/guardar-turno']);
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
}
