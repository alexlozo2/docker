import { Usuario } from './../models/Usuario';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'http://localhost:8080/api/Usuario/';
  urlLogin = 'http://localhost:8080/api/Usuario/login';

  constructor(private http: HttpClient) {}

  // Método para crear un usuario
  crearUsuario(usuario:Usuario):Observable<any>{
    return this.http.post(this.url, usuario);
  }

  logearUsuario(email:string, contrasena:string):Observable<any>{
    return this.http.post(this.urlLogin, {email,contrasena});
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(this.url + id);
}

enviarCodigoVerificacion(email: string) {
  return this.http.post(this.url + 'generarCodico', { email });
}

nuevoToken(email: string){
  return this.http.post(this.url + 'nuevaContra', {email});
}

logearUsuarioGoogle(email:string, username:string):Observable<any>{
  return this.http.post(this.url + 'loginWithGoogle', {email,username});
}

nuevaContra(newPas:Usuario): Observable<any>{
  return this.http.put(this.url + 'cambioC', {email: newPas.email, contrasena: newPas.contrasena});
}

  
}
