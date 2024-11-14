import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPComponent } from './lista-p.component';

describe('ListaPComponent', () => {
  let component: ListaPComponent;
  let fixture: ComponentFixture<ListaPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
