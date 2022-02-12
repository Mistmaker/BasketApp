import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaIdaVueltaComponent } from './liga-ida-vuelta.component';

describe('LigaIdaVueltaComponent', () => {
  let component: LigaIdaVueltaComponent;
  let fixture: ComponentFixture<LigaIdaVueltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigaIdaVueltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaIdaVueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
