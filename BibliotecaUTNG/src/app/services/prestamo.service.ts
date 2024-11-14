import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  url = 'http://localhost:8080/api/Prestamo/';

  constructor(private http: HttpClient) {}

  obtenerPrestamos(emailUser: string): Observable<any> {
    const params = new HttpParams().set('emailUser', emailUser);
    return this.http.get<any>(`${this.url}?emailUser=${emailUser}`);
  }

  crearPrestamo(prestamo: any): Observable<any> {
    return this.http.post<any>(this.url, prestamo);
  }

  
  usuarioPrestamo(emailUser: string): Observable<any> {
    const params = new HttpParams().set('emailUser', emailUser);
    return this.http.get<any>(`${this.url + 'usuarioL'}?emailUser=${emailUser}`);
  }

  listaPrestamos(): Observable<any> {
    return this.http.get<any>(this.url + 'listaPres');
  }


}
