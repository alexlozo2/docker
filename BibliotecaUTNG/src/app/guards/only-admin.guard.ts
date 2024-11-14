import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlyAdminGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    if (localStorage.getItem('token') && localStorage.getItem('userRol') == 'Bibliotecario') { 
        return true;
    } else {
      this.router.navigate(['errorPage']);
      return false;
    }
  } 
}
