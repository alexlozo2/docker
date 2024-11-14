import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotFGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    /*return this.authService.getAuthToke().pipe(map(authentication=> {
      if (authentication) {
        return true; // Permitir la navegación si el usuario está autenticado
      } else {
        this.router.navigate(['errorPage']); // Redirigir a la página de error si no está autenticado
        return false; // Bloquear la navegación
      }
    }));*/
    if (localStorage.getItem('token') && localStorage.getItem('userRol') == 'Usuario' || localStorage.getItem('userRol') == 'Bibliotecario' || localStorage.getItem('userGoogle') == 'Sí') {
          return true;
          
    } else {
      this.router.navigate(['errorPage']);
      return false;
    }

  }

}

