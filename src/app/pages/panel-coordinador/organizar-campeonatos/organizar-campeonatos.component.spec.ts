import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizarCampeonatosComponent } from './organizar-campeonatos.component';

describe('OrganizarCampeonatosComponent', () => {
  let component: OrganizarCampeonatosComponent;
  let fixture: ComponentFixture<OrganizarCampeonatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizarCampeonatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizarCampeonatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
