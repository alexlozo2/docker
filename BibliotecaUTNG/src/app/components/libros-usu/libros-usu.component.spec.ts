import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosUsuComponent } from './libros-usu.component';

describe('LibrosUsuComponent', () => {
  let component: LibrosUsuComponent;
  let fixture: ComponentFixture<LibrosUsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrosUsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
