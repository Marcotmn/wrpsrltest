import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { BooksService } from 'src/app/service/books.service';
import { MylibraryService } from 'src/app/service/mylibrary.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {

  private libroSubscription: Subscription | undefined;
  libro: any;

  constructor(
    private myLibraryService: MylibraryService,
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.visualizzaDettagliLibro();

  }

// METODO PER AGGIUNGERE LIBRI ALLA LIBRERIA PERSONALE // DA COLLEGARE AD UN PULSANTE
  private aggiungiAllaLibreriaPersonale(): void {
    this.myLibraryService
      .addToMyLibrary()
      .pipe(
        catchError((error) => {
          console.error(
            "Errore durante l'aggiunta del libro alla libreria personale:",
            error
          );
          alert(
            "Si è verificato un errore durante l'aggiunta del libro alla libreria personale. Riprova più tardi."
          );
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Libro aggiunto alla libreria personale:', response);
          this.router.navigate(['/my-library']); //DA INSERIRE PATH CORRETTO
        },
      });

  }

  // METODO PER RIMUOVERE LIBRI DALLA LIBRERIA PERSONALE // DA COLLEGARE AD UN PULSANTE
  private rimuoviDallaLibreriaPersonale(): void {
    this.myLibraryService
      .removeFromMyLibrary()
      .pipe(
        catchError((error) => {
          console.error(
            'Errore durante la rimozione del libro alla libreria personale:',
            error
          );
          alert(
            'Si è verificato un errore durante la rimozione del libro alla libreria personale. Riprova più tardi.'
          );
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Libro rimosso dalla libreria personale:', response);
          this.router.navigate(['/my-library']); //DA INSERIRE PATH CORRETTO
        },
      });

  }

  // PER CARICARE I DETTAGLI DI UN LIBRO
  private visualizzaDettagliLibro(): void {
    // OTTENGO L'ID DAL PARAMETRO URL
    const idLibro = this.route.snapshot.paramMap.get('idLibro');

    // CONTROLLO CHE L'ID SIA EFFETTIVAMENTE NELL'URL
    if (!idLibro) {
      console.error("ID del libro non trovato nell'URL");
      return;
    }

    this.libroSubscription = this.booksService
      .getLibro()
      .pipe(
        catchError((error) => {
          console.error(
            'Errore durante il caricamento dei dettagli del libro',
            error
          );
          alert('Si è verificato un errore, ricarica la pagina.');
          return throwError(() => []);
        })
      )
      .subscribe({
        next: (libro) => {
          this.libro = libro;
          console.log('Dettagli del libro:', this.libro);
        },
      });

  }

  ngOnDestroy(): void {
    if (this.libroSubscription) {
      this.libroSubscription.unsubscribe();
    }
  }
  
}
