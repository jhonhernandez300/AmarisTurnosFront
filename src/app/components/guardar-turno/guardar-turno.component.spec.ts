import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarTurnoComponent } from './guardar-turno.component';

describe('GuardarTurnoComponent', () => {
  let component: GuardarTurnoComponent;
  let fixture: ComponentFixture<GuardarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardarTurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
