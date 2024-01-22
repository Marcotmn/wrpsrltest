import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublishersService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  // UPLOAD EDITORI
  uploadEditore(editore: string): Observable<any> {
    const editoreData = new FormData();
    editoreData.append('editore', editore);

    return this.http
      .post(`${this.baseURL}/publishers/upload-publishers`, editoreData)
      .pipe(
        catchError((error: any) => {
          console.error("Errore durante l'upload dell'editore:", error);
          throw error;
        })
      );
  }

  // RECUPERA EDITORI
  getEditori(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseURL}/publishers/allpublishers`)
      .pipe(
        catchError((error: any) => {
          console.error('Errore durante il recupero degli editori:', error);
          throw error;
        })
      );
  }
}
