import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-libros-usu',
  templateUrl: './libros-usu.component.html',
  styleUrls: ['./libros-usu.component.css']
})
export class LibrosUsuComponent implements OnInit {

  constructor(
    private prestamoService: PrestamoService,
    private usuarioService: UsuariosService,
    private authGoogleService: AuthGoogleService
  ) { }

  libros: any = [] = [];
  email: any;
  usuario: any;

  ngOnInit(): void {
    this.obtenerUsuario()
    //this.getLibrosUsu(this.email)
    console.log(this.email)
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
          this.getLibrosUsu(this.email); // Llamar a getLibrosUsu después de obtener el email
          console.log(this.libros)
        },
        error => {
          console.error('Error al obtener usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del usuario en el almacenamiento local');
    }
  }
  
  getLibrosUsu(email: string) {
    this.prestamoService.usuarioPrestamo(email).subscribe(
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

































  //--------------------------------------------------------------------------------------------
  /*getLibrosUsu(email: string) {
    this.prestamoService.usuarioPrestamo(email).subscribe(
      (data) => {
        console.log('Préstamos obtenidos:', data);
        this.libros = data; // Asigna la respuesta al arreglo libros
        console.log('Libros asignados:', this.libros);
      },
      (error) => {
        console.error('Error al obtener préstamos:', error);
      }
    );
  }*/

  /*obtenerUsuario(): void {
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
      );
    }

  }*/

  /*
  obtenerUsuarioGoogle(): void {
    let userData = this.authGoogleService.getProfile();
    if (userData && userData['email']) {
      this.email = userData['email'];
      console.log(this.email);
    }
  }*/



}
