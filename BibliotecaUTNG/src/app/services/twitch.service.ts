// twitch.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class TwitchService {
//   private clientId = 'TU_CLIENT_ID'; // Reemplaza con tu Client ID
//   private clientSecret = 'TU_CLIENT_SECRET'; // Reemplaza con tu Client Secret
//   private apiUrl = 'https://api.twitch.tv/helix';

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     return new HttpHeaders({
//       'Client-ID': this.clientId,
//       'Authorization': `Bearer ${TU_ACCESS_TOKEN}`, // Puedes obtener el token de acceso mediante OAuth
//     });
//   }

//   getStreams(): Observable<any> {
//     const headers = this.getHeaders();
//     return this.http.get(`${this.apiUrl}/streams`, { headers });
//   }
// }
