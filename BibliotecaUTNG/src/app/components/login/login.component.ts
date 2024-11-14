import { UsuariosService } from './../../services/usuarios.service';
import { Usuario } from './../../models/Usuario';
import { Rol } from './../../models/Rol';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/yotube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import 'jquery/dist/jquery.min.js';


// Declara la función grecaptcha como una variable global
declare const grecaptcha: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  listRoles: Rol[] = [];
  usuarioForm: FormGroup;
  usuarioForm2: FormGroup;
  errorMensaje: string = '';
  intentosFallidos: number = 0;
  codigoVerificacionEnviado: boolean = false;
codigoVerificacionEnviadoExitosamente: boolean = false;
codigoVerificacion: any ;
  
  @ViewChild('captchaElement') captchaElement: any;
  @ViewChild('staticBackdrop') codigoVerificacionModal!: ElementRef;

  
  loading: boolean = false;
  message: string = '';

  email: string = "";
  contrasena: string = "";
  confirmarContrasena : string = "" ; //Lo agregue yo
  videos: any[] | undefined; // Almacena los datos de los videos
  videoUrl!: SafeResourceUrl; // URL segura para el video

  


  constructor(private fb: FormBuilder,
    private recoveryPasswordService: UsuariosService,
    private fb2: FormBuilder,
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private _usuarioService: UsuariosService,
    private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {
      this.usuarioForm = this.fb.group({
        nombreUsuario: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [
            Validators.required,
            Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/)
        ]],
        confirmarContrasena: ['', Validators.required]
    }, {
        validators: this.confirmarContrasenaValidator.bind(this)
    });
      
    this.usuarioForm2 = this.fb2.group({
      email: ['', Validators.email],
      contrasena: ['', Validators.required]
    })
  }

  confirmarContrasenaValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const contrasena = formGroup.get('contrasena')?.value;
    const confirmarContrasena = formGroup.get('confirmarContrasena')?.value;

    if (contrasena !== confirmarContrasena) {
        return { 'contrasenaNoCoincide': true };
    }

    return null;
}

  

  ngOnInit(): void {
    this.youtubeService.getVideos().subscribe((data: any) => {
      this.videos = data.items;
    });
  }
  getVideoUrl(videoId: string): SafeResourceUrl {
    if (videoId) {
      const url = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }

  enviarCodigoVerificacion() {
    const email = this.usuarioForm.get('email')?.value;
    this._usuarioService.enviarCodigoVerificacion(email).subscribe(
      (codigo) => {
        // Guarda el código de verificación y abre el modal
        this.codigoVerificacion = codigo;
        // this.abrirModalCodigoVerificacion();
      },
      (error) => {
        console.error('Error al enviar el código de verificación:', error);
      }
    );
  }

  // abrirModalCodigoVerificacion() {
  //   // @ts-ignore
  //   $(this.codigoVerificacionModal.nativeElement).modal('show');
  // }

  // Función para verificar el código desde el modal
  verificarCodigo() {
    const codigoIngresado = (document.getElementById('codigoVerificacionInput') as HTMLInputElement)?.value;
    if (codigoIngresado === this.codigoVerificacion) {
        // Código correcto, cierra el modal y procede con la creación de la cuenta
        const modalElement = document.getElementById('staticBackdrop');
        if (modalElement) {
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
        }
        this.crearCuenta();
    } else {
        alert('El código de verificación es incorrecto.');
    }
}

  


  // solicitarCodigoVerificacion(codigoEnviado: any) {
  //   for (let i = 0; i < 3; i++) {
  //     const codigoRes = prompt('Ingresa el código enviado al correo');
  //     if (codigoRes === codigoEnviado) {
  //       this.crearCuenta();
  //       return;
  //     } else {
  //       alert('Código incorrecto. Inténtalo de nuevo.');
  //     }
  //   }
  
  //   alert('Has excedido el número de intentos. Se enviará un nuevo código de verificación.');
  //   this.enviarCodigoVerificacion();
  //   this.codigoVerificacionEnviado = false;
  // }

  crearCuenta() {

    const USUARIO: Usuario = {
      nombreUsuario: this.usuarioForm.get('nombreUsuario')?.value,
      email: this.usuarioForm.get('email')?.value,
      contrasena: this.usuarioForm.get('contrasena')?.value,
    }
    console.log(USUARIO);
    this._usuarioService.crearUsuario(USUARIO).subscribe(data => {
      alert("Se ha creado el usuario exitosamente!!!");
      window.location.reload();
    }, error => {
      console.log(error);
      this.usuarioForm.reset();
    });

  }

  leguearUsuario(email: string, contrasena: string) {
    /*
     // Verificar si la casilla de verificación está marcada
     const captchaResponse = grecaptcha.getResponse();
     const captchaChecked = captchaResponse && captchaResponse.length !== 0;

   
     if (!captchaChecked) {
       // Si la casilla de verificación no está marcada, muestra un mensaje de error
       console.log('Verificación humana incompleta.');
       this.errorMensaje = 'Por favor, completa la verificación humana';
       alert("Completa la verfificación");
       return;
     }
 */

    this._usuarioService.logearUsuario(email, contrasena)
      .subscribe(data => {
        console.log(data);
        // Guardar el ID del usuario en el localStorage
        localStorage.setItem('userID', data.id);
        localStorage.setItem('userRol', data.rol);
        localStorage.setItem('Logueado', "Sí");

        // Guardar el token en el localStorage
        localStorage.setItem('token', data.token);

        // Redireccionar a la página de libros con el ID del usuario
        this.router.navigate(['/libros']);
      }, error => {
        console.log(error);
      });
  }

  login() {
    
    localStorage.setItem('userGoogle', 'Sí');
    localStorage.setItem('Logueado', "Sí");
    this.authGoogleService.login();
  }

  requestPasswordReset(): void {
    this.loading = true;
    this.recoveryPasswordService.getUsuario(this.email).subscribe(
      response => {
        this.loading = false;
        this.message = response.message;
      },
      error => {
        this.loading = false;
        this.message = error.error.msg;
      }
    );
  }
}

