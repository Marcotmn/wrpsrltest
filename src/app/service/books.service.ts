import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  //GET DI TUTTI I LIBRI IN DB
  getLibri(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/books/allbooks`).pipe(
      catchError((error: any) => {
        console.error('Errore durante il recupero dei libri', error);
        throw error;
      })
    );
  }

  //GET LIBRO SPECIFICO
  getLibro(): Observable<any[]> {
    // OTTENGO L'ID DAL PARAMETRO URL
    const idLibro = this.route.snapshot.paramMap.get('idLibro');

    // CONTROLLO CHE L'ID SIA EFFETTIVAMENTE NELL'URL
    if (!idLibro) {
      console.error("ID del libro non trovato nell'URL");
      return throwError(() => "ID del libro non è presente nell'URL");
    }

    return this.http.get<any[]>(`${this.baseURL}/books/${idLibro}`).pipe(
      catchError((error: any) => {
        console.error('Errore durante il recupero dei libri', error);
        throw error;
      })
    );
  }
}
