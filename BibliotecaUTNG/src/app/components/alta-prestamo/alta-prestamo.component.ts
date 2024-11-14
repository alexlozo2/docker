import { Component, OnInit } from '@angular/core';
import {PrestamoService} from '../../services/prestamo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-prestamo',
  templateUrl: './alta-prestamo.component.html',
  styleUrls: ['./alta-prestamo.component.css']
})
export class AltaPrestamoComponent implements OnInit {

  fechaInicio: string = this.obtenerFechaActual();
  fechaFin: string = '';
  minFechaFin: string = this.obtenerFechaActual();
  maxFechaFin: string = this.obtenerMaxFechaFin();
  usuario: any;
  email: any;
  idLibro: any;
  libros: any[] = []; // Inicializa como un arreglo vacío

  constructor(
    private route: ActivatedRoute,
    private prestamoService: PrestamoService,
    private usuarioService: UsuariosService,
    private authGoogleService: AuthGoogleService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerIdLibro();
    console.log(this.email);
    this.obtenerPrestamos(this.email);
  }

  obtenerUsuario(): void {
    let id = localStorage.getItem('userID');
    if (id) {
      this.usuarioService.getUsuario(id).subscribe(
        res => {
          console.log(res);
          this.usuario = res;
          this.email = this.usuario.email;
          console.log(this.email);
          // Llama a obtenerPrestamos y asigna los libros al arreglo libros
        },
        err => {
          console.log(err);
          this.obtenerUsuarioGoogle();
        }
      );
    } else {
      this.obtenerUsuarioGoogle();
    }
  }

  obtenerIdLibro(): void {
    this.route.params.subscribe(params => {
      this.idLibro = params['id'];
      console.log('ID del Libro:', this.idLibro);
    });
  }

  obtenerUsuarioGoogle(): void {
    let userData = this.authGoogleService.getProfile();
    if (userData && userData['email']) {
      this.email = userData['email'];
      console.log(this.email);
    }
  }

  // Cambia el tipo de retorno a void
  obtenerPrestamos(email: string): void {
    this.prestamoService.obtenerPrestamos(email).subscribe(
      (data) => {
        console.log('Préstamos obtenidos:', data);
        this.libros = data; // Asigna la respuesta al arreglo libros
        console.log('Libros asignados:', this.libros);
      },
      (error) => {
        console.error('Error al obtener préstamos:', error);
      }
    );
  }
  
  

  crearPrestamo(): void {
    // Verificar que las fechas estén seleccionadas
    if (!this.fechaInicio || !this.fechaFin) {
      console.error('Debes seleccionar las fechas de inicio y devolución.');
      return;
    }
  
    // Construir el objeto de préstamo
    const prestamo = {
      emailUser: this.email,
      idLibro: this.idLibro,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      
    };
  
    // Llamar al servicio para crear el préstamo
    this.prestamoService.crearPrestamo(prestamo).subscribe(
      (data) => {
        console.log('Prestamo creado:', data);
        alert('Prestamo autorizado!!!');
        // Aquí puedes manejar la respuesta del servidor
      },
      (error) => {
        console.error('Error al crear préstamo:', error);
        // Aquí puedes manejar los errores de la solicitud
      }
    );
    this.router.navigate(['/libros']);
  }

  obtenerFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0'); // Agrega cero a la izquierda si es necesario
    let day = today.getDate().toString().padStart(2, '0'); // Agrega cero a la izquierda si es necesario

    return `${year}-${month}-${day}`;
  }

  obtenerMaxFechaFin(): string {
    const today = new Date();
    today.setDate(today.getDate() + 30); // Agrega 8 días a la fecha actual
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0'); // Agrega cero a la izquierda si es necesario
    let day = today.getDate().toString().padStart(2, '0'); // Agrega cero a la izquierda si es necesario

    return `${year}-${month}-${day}`;
  }

  submitForm() {
    // Aquí puedes enviar las fechas a tu servicio para pedir el libro prestado
    console.log('Fecha de Inicio:', this.fechaInicio);
    console.log('Fecha de Devolución:', this.fechaFin);
  }
}
