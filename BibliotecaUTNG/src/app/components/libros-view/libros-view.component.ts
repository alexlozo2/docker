import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.services';

@Component({
  selector: 'app-libros-view',
  templateUrl: './libros-view.component.html',
  styleUrls: ['./libros-view.component.css']
})
export class LibrosViewComponent implements OnInit {
  libros: any = [];

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros() {
    this.librosService.getLibroWithoutToke().subscribe(
      res => {
        this.libros = res;
      },
      err => console.log(err)
    );
  }
}
