import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../services/usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  email = '';
  contrasena: string = "";
  usuarioForm: FormGroup;
  codigoVerificacionEnviado: boolean = false;
  intentosFallidos: number = 0;
  codigoVerificacionEnviadoExitosamente: boolean = false;
  codigoVerificacion: any ;

  constructor( 
    private userService: UsuariosService,
    private _usuarioService: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
  ) { 
    this.usuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/)
    ]],
    confirmarContrasena: ['', Validators.required]
}, {
    validators: this.confirmarContrasenaValidator.bind(this)
});

  }

  ngOnInit(): void {
  }

  confirmarContrasenaValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const contrasena = formGroup.get('contrasena')?.value;
    const confirmarContrasena = formGroup.get('confirmarContrasena')?.value;

    if (contrasena !== confirmarContrasena) {
        return { 'contrasenaNoCoincide': true };
    }

    return null;
}

  sendPasswordResetEmail(){
    const email = this.usuarioForm.get('email')?.value;
    this._usuarioService.nuevoToken(email).subscribe(
      (codigo) => {
        this.codigoVerificacionEnviado = true; // Indicar que se ha enviado un código de verificación
        this.codigoVerificacion = codigo;
      },
      (error) => {
        console.error('Error al enviar el código de verificación:', error);
      }
    );
  }

  verificarCodigo() {
    const codigoIngresado = (document.getElementById('codigoVerificacionInput') as HTMLInputElement)?.value;
    if (codigoIngresado === this.codigoVerificacion) {
        // Código correcto, cierra el modal y procede con la creación de la cuenta
        const modalElement = document.getElementById('staticBackdrop');
        if (modalElement) {
            modalElement.classList.remove('show');
            //modalElement.style.display = 'none';
        }
        this.newPassword()
    } else {
        alert('El código de verificación es incorrecto.');
    }
}
  newPassword(){
    const newPas:Usuario = {
      email: this.usuarioForm.get('email')?.value,
      contrasena: this.usuarioForm.get('contrasena')?.value
    }
    console.log(newPas);
    this._usuarioService.nuevaContra(newPas).subscribe(
      data => {
        
        alert("Se ha actualizado la contraseña");
      
      this.router.navigate(['login']);

      }, error => {
        console.log(error);
        this.usuarioForm.reset();
      });
  }
  
}
