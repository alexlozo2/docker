import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa-sitio',
  templateUrl: './mapa-sitio.component.html',
  styleUrls: ['./mapa-sitio.component.css']
})
export class MapaSitioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
