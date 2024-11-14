import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthGoogleService } from 'src/app/services/auth-google.service';


@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {
  userID = localStorage.getItem('userID');
  isBibliotecario: boolean = false; // Variable para verificar si el usuario es autorizado (bibiotecario)
  estaLogueado: boolean = localStorage.getItem('Logueado') === 'Sí'; // Verifica si el usuario está logueado

  constructor(private router: Router,  private usuarioService: UsuariosService,private authGoogleService: AuthGoogleService,) { }

  ngOnInit(): void {
    this.checkIfUserIsBibliotecario();
  }


  cerrarSesion() {
    // Remover el token del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userGoogle');
    localStorage.removeItem('Logueado');
    this.authGoogleService.logout();
    // Redireccionar a la página de inicio de sesión (o cualquier otra página deseada)
    this.router.navigate(['/home']);
  }

  checkIfUserIsBibliotecario() {
    if (this.userID) {
      this.usuarioService.getUsuario(this.userID).subscribe(
        res => {
          // Verificar si el usuario es bibliotecario aquí
          this.isBibliotecario = res.rol === 'Bibliotecario';
        },
        error => {
          console.error('Error al obtener datos del usuario:', error);
        }
      );
    } else {
      console.error('El valor de userID es undefined');
    }
  }
  

}


