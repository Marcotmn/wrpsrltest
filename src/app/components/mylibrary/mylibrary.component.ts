import { Component, OnInit } from '@angular/core';
import { MylibraryService } from 'src/app/service/mylibrary.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.css'],
})
export class MylibraryComponent implements OnInit {
  
  private libreriaSubscription: Subscription | undefined;
  libriInLibreria: any[] = [];

  constructor(private myLibraryService: MylibraryService) {}

  ngOnInit(): void {
    this.visualizzaLibreriaPersonale();
  }

  private visualizzaLibreriaPersonale(): void {
    this.libreriaSubscription = this.myLibraryService
      .openMyLibrary()
      .pipe(
        catchError((error) => {
          console.error(
            'Errore durante il recupero della libreria personale:',
            error
          );
          alert('Si è verificato un errore, ricarica la pagina.');
          return of([]);
        })
      )
      .subscribe({
        next: (libri) => {
          this.libriInLibreria = libri;
          console.log('Libreria personale:', this.libriInLibreria);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.libreriaSubscription) {
      this.libreriaSubscription.unsubscribe();
    }
  }
}
