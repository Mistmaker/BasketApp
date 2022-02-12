import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosFechasComponent } from './partidos-fechas.component';

describe('PartidosFechasComponent', () => {
  let component: PartidosFechasComponent;
  let fixture: ComponentFixture<PartidosFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidosFechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidosFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
