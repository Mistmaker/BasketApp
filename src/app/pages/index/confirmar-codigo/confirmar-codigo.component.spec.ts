import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCodigoComponent } from './confirmar-codigo.component';

describe('ConfirmarCodigoComponent', () => {
  let component: ConfirmarCodigoComponent;
  let fixture: ComponentFixture<ConfirmarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarCodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
