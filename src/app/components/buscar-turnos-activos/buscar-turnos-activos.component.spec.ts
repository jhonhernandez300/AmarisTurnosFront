import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTurnosActivosComponent } from './buscar-turnos-activos.component';

describe('BuscarTurnosActivosComponent', () => {
  let component: BuscarTurnosActivosComponent;
  let fixture: ComponentFixture<BuscarTurnosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarTurnosActivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarTurnosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
