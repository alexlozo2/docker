import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyAfUXxXSlrDkoRmDRm-CfOLP2_TJLn5IjY';
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<any> {
    const url = `${this.apiUrl}/search?key=${this.apiKey}&part=snippet&type=video&q=Recomendaciones de libros`;
    return this.http.get(url);
  }
}
