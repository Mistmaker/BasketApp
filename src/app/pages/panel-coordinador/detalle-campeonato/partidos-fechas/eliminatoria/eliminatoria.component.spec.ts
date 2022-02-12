import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriaComponent } from './eliminatoria.component';

describe('EliminatoriaComponent', () => {
  let component: EliminatoriaComponent;
  let fixture: ComponentFixture<EliminatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminatoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
