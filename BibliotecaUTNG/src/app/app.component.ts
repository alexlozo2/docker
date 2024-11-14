import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bibliotecaAPIS';

  constructor(private router: Router) {}

  ngOnInit() {
    // // Verificar si el token está presente en el localStorage
    // const token = localStorage.getItem('token');

    // if (!token) {
    //   // Redirigir al usuario al componente de login si no hay token
    //   this.router.navigate(['/errorPage']);
    // }
  }
}
