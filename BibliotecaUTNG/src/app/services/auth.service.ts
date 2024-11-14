import { Injectable } from '@angular/core';
//import { Observable, of } from 'rxjs';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // constructor(private jwtHelper: JwtHelperService) { }
/*  getAuthToke(): Observable<boolean>{
    const token = localStorage.getItem('token');
    return of(token !== null && !this.jwtHelper.isTokenExpired(token))
  }*/
}
