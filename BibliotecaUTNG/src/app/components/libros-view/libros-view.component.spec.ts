import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosViewComponent } from './libros-view.component';

describe('LibrosViewComponent', () => {
  let component: LibrosViewComponent;
  let fixture: ComponentFixture<LibrosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
