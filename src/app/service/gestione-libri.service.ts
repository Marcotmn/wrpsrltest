import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GestioneLibriService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  // UPLOAD LIBRO
  uploadLibro(titolo: string, editore: string): Observable<any> {
    const libroData = new FormData();
    libroData.append('titolo', titolo);
    libroData.append('editore', editore);

    return this.http.post(`${this.baseURL}/admin/upload-libro`, libroData).pipe(
      catchError((error: any) => {
        console.error("Errore durante l'upload del libro:", error);
        throw error;
      })
    );
  }

  // MODIFICA LIBRO
  modificaLibro(titolo: string, editore: string): Observable<any> {
    // OTTENGO L'ID DAL PARAMETRO URL
    const idLibro = this.route.snapshot.paramMap.get('idLibro');

    // CONTROLLO CHE L'ID SIA EFFETTIVAMENTE NELL'URL
    if (!idLibro) {
      console.error("ID del libro non trovato nell'URL");
      return throwError(() => "ID del libro non è presente nell'URL");
    }
    const libroModificatoData = new FormData();

    libroModificatoData.append('titolo', titolo);
    libroModificatoData.append('editore', editore);

    return this.http
      .put(
        `${this.baseURL}/admin/modifica-libro/${idLibro}`,
        libroModificatoData
      )
      .pipe(
        catchError((error: any) => {
          console.error('Errore durante la modifica del libro:', error);
          throw error;
        })
      );
  }

  // CANCELLA LIBRO
  cancellaLibro(): Observable<any> {
    // OTTENGO L'ID DAL PARAMETRO URL
    const idLibro = this.route.snapshot.paramMap.get('idLibro');

    // CONTROLLO CHE L'ID SIA EFFETTIVAMENTE NELL'URL
    if (!idLibro) {
      console.error("ID del libro non trovato nell'URL");
      return throwError(() => "ID del libro non è presente nell'URL");
    }

    return this.http
      .delete(`${this.baseURL}/admin/cancella-libro/${idLibro}`)
      .pipe(
        catchError((error: any) => {
          console.error('Errore durante la cancellazione del libro:', error);
          throw error;
        })
      );
  }
}
