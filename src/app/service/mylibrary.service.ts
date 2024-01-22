import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MylibraryService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  //AGGIUNTA LIBRO ALLA LIBRERIA PERSONALE
  addToMyLibrary(): Observable<any> {
    // OTTENGO L'ID DAL PARAMETRO URL
    const idLibro = this.route.snapshot.paramMap.get('idLibro');

    // CONTROLLO CHE L'ID SIA EFFETTIVAMENTE NELL'URL
    if (!idLibro) {
      console.error("ID del libro non trovato nell'URL");
      return throwError(() => "ID del libro non è presente nell'URL");
    }

    return this.http
      .post(`${this.baseURL}/mylibrary/aggiungi/${idLibro}`, {})
      .pipe(
        catchError((error: any) => {
          console.error(
            "Errore durante l'aggiunta del libro alla libreria:",
            error
          );
          throw error;
        })
      );
  }


  // METODO PER RIMUOVERE UN LIBRO DALLA LIBRERIA PERSONALE
  removeFromMyLibrary(): Observable<any> {
    // OTTENGO L'ID DAL PARAMETRO URL
    const idLibro = this.route.snapshot.paramMap.get('idLibro');

     // CONTROLLO CHE L'ID SIA EFFETTIVAMENTE NELL'URL
     if (!idLibro) {
      console.error("ID del libro non trovato nell'URL");
      return throwError(() => "ID del libro non è presente nell'URL");
    }

    return this.http
      .delete<any>(`${this.baseURL}/mylibrary/cancella/${idLibro}`)
      .pipe(
        catchError((error: any) => {
          console.error(
            'Errore durante la rimozione del libro dalla libreria personale:',
            error
          );
          throw error;
        })
      );
  }

    // METODO PER RECUPERARE TUTTA LA LIBRERIA PERSONALE
    openMyLibrary(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}/mylibrary/elenco`).pipe(
        catchError((error: any) => {
          console.error(
            'Errore durante il recupero della libreria personale:',
            error
          );
          throw error;
        })
      );
    }
    
}
