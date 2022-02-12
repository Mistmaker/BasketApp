import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaIdaComponent } from './liga-ida.component';

describe('LigaIdaComponent', () => {
  let component: LigaIdaComponent;
  let fixture: ComponentFixture<LigaIdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigaIdaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaIdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
