import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecundarioNavComponent } from './secundario-nav.component';

describe('SecundarioNavComponent', () => {
  let component: SecundarioNavComponent;
  let fixture: ComponentFixture<SecundarioNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecundarioNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecundarioNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
