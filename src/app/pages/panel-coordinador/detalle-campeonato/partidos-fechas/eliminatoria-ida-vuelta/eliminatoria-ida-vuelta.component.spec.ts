import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriaIdaVueltaComponent } from './eliminatoria-ida-vuelta.component';

describe('EliminatoriaIdaVueltaComponent', () => {
  let component: EliminatoriaIdaVueltaComponent;
  let fixture: ComponentFixture<EliminatoriaIdaVueltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminatoriaIdaVueltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminatoriaIdaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
