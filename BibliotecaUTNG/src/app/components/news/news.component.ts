import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  noticias: any[] = [];
  secciones: string[] = ['technology', 'business', 'health','books']; // Ejemplo de secciones
  seccionSeleccionada: string = 'technology'; // Sección por defecto
  busqueda: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias() {
    const apiKey = 'b073c116789b49fdbf89d59c1b7d6079';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=US&category=${this.seccionSeleccionada}&apiKey=${apiKey}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.noticias = data.articles;
    });
  }

  cambiarSeccion(seccion: string) {
    this.seccionSeleccionada = seccion;
    this.getNoticias();
  }

  buscarNoticias() {
    this.getNoticias();
  }
}