import { Component, OnInit } from '@angular/core';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-lista-p',
  templateUrl: './lista-p.component.html',
  styleUrls: ['./lista-p.component.css']
})
export class ListaPComponent implements OnInit {

  constructor(private prestamosService:PrestamoService) { }

  prestamos: any = [] = [];

  ngOnInit(): void {
    this.getPrestamos()
  }

  getPrestamos(){
    this.prestamosService.listaPrestamos().subscribe(
      res => {
        this.prestamos = res;
        console.log(this.prestamos)
      },
      err => console.log(err)
    )
  }

}
