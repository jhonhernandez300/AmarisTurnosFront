import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TurnoService } from '../../servicios/turno.service';
import { LocalStorageService } from '../../servicios/local-storage.service';
import { GuardarTurnoComponent } from './guardar-turno.component';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('GuardarTurnoComponent', () => {
  let component: GuardarTurnoComponent;
  let fixture: ComponentFixture<GuardarTurnoComponent>;
  let turnoServiceSpy: jasmine.SpyObj<TurnoService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    const turnoServiceMock = jasmine.createSpyObj('TurnoService', ['ContarTurnos', 'Crear']);
    const localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [GuardarTurnoComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: TurnoService, useValue: turnoServiceMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock },
        { provide: Router, useValue: {} },
        { provide: NgbModal, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GuardarTurnoComponent);
    component = fixture.componentInstance;
    turnoServiceSpy = TestBed.inject(TurnoService) as jasmine.SpyObj<TurnoService>;
    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes
    httpMock.verify();
  });

  it('should call handleError when the user has more than 5 turns', async(() => {
    // Simulamos que el método getData devuelve un id de usuario.
    localStorageServiceSpy.getData.and.returnValue(1);

    // Simulamos que contarTurnos devuelve un Observable con el número de turnos (17 en este caso).
    turnoServiceSpy.ContarTurnos.and.returnValue(of(17));

    // Espiamos el método handleError y permitimos que siga ejecutando su lógica.
    const handleErrorSpy = spyOn(component as any, 'handleError').and.callThrough();

    // Ejecutamos el método onSubmit.
    component.onSubmit().then(() => {
      // Verificamos que el método handleError se haya llamado con el mensaje esperado.
      expect(handleErrorSpy).toHaveBeenCalledWith({ message: "El usuario ya tiene 5 turnos." });

      // Verificamos que no se haya llamado a createTurno.
      expect(turnoServiceSpy.Crear).not.toHaveBeenCalled();
    });
  }));
});
