import { Component, OnInit } from '@angular/core';
import { Subscription, catchError, of } from 'rxjs';
import { PublishersService } from 'src/app/service/publishers.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css'],
})
export class PublishersComponent implements OnInit {
  private editoriSubscription: Subscription | undefined;
  tuttiGliEditori: any[] = [];

  constructor(private pubblishersService: PublishersService) {}

  ngOnInit(): void {
    this.visualizzaListaEditori();
  }

  //PER CARICARE TUTTI GLI EDITORI
  private visualizzaListaEditori(): void {
    this.editoriSubscription = this.pubblishersService
      .getEditori()
      .pipe(
        catchError((error) => {
          console.error('Errore durante il caricamento degli editori', error);
          alert('Si è verificato un errore, ricarica la pagina.');
          return of([]);
        })
      )
      .subscribe({
        next: (editori) => {
          this.tuttiGliEditori = editori;
          console.log('Tutti gli editori', this.tuttiGliEditori);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.editoriSubscription) {
      this.editoriSubscription .unsubscribe();
    }
  }
}
