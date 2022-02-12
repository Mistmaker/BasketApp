import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosCampeonatosComponent } from './resultados-campeonatos.component';

describe('ResultadosCampeonatosComponent', () => {
  let component: ResultadosCampeonatosComponent;
  let fixture: ComponentFixture<ResultadosCampeonatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosCampeonatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosCampeonatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
