import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatosDestacadosComponent } from './campeonatos-destacados.component';

describe('CampeonatosDestacadosComponent', () => {
  let component: CampeonatosDestacadosComponent;
  let fixture: ComponentFixture<CampeonatosDestacadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampeonatosDestacadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampeonatosDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
