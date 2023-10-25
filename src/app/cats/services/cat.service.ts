import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private apiUrl = 'https://api.thecatapi.com/v1/'
  private apiKey = 'live_SQ3PlipP0vKy9ZE0AL5esAZH9OGXkta3WA0Y2Em0dZQU3bt1RE0Jl0SHozYGpVrK';

  constructor(private http: HttpClient) { }

 
  getCatImages(limite:string, breed:string): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    const apiUrl = breed !== 'Desconocido'
    ? `${this.apiUrl}images/search?limit=${limite}&breed_ids=${breed}`
    : `${this.apiUrl}images/search?limit=${limite}`;

    return this.http.get<any[]>(apiUrl, { headers }).pipe(
      map(data => {
        // Transformar datos: Cambiar propiedades según la documentación
        return data.map(image => {
          const breedInfo = image.breeds[0] || {};

          return {
            id: image.id,
            url: image.url,
            breed: breedInfo.name || 'Desconocida',
            temperamento: breedInfo.temperament || 'Desconocido',
            origen: breedInfo.origin || 'Desconocido',
            // Puedes agregar más propiedades u otros cambios aquí
          };
        });
      })
    );
  }

  getBreeds(): Observable<any> {

    return new Observable((suscriber) =>{
      this.http.get(this.apiUrl + 'breeds').subscribe((data:any) =>{
        
        suscriber.next(data);
        suscriber.complete();
      });
    })
  }
}
