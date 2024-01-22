import { Component, OnInit } from '@angular/core';
import { GestioneLibriService } from 'src/app/service/gestione-libri.service';
import { PublishersService } from 'src/app/service/publishers.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // ARRAY VUOTO IN CUI SALVARE GLI EDITORI DAL DB // EDITORESELEZIONATO VARIABILE PER IL DATA BINDING CON IL FORM
  editori: any[] = [];
  editoreSelezionato: string = '';

  constructor(
    private gestioneLibriService: GestioneLibriService,
    private publishersService: PublishersService
  ) {}

  ngOnInit(): void {}

  // UPLOAD LIBRO
  uploadLibro(titolo: string): void {
    //CONTROLLA SE L'EDITORE è STATO SELEZIONATO
    if (!this.editoreSelezionato) {
      console.error('Devi selezionare un editore');
      return;
    }

    this.gestioneLibriService
      .uploadLibro(titolo, this.editoreSelezionato)
      .subscribe({
        next: (risposta) => {
          console.log('Libro caricato con successo:', risposta);
        },
        error: (errore) => {
          console.error("Errore durante l'upload del libro:", errore);
        },
      });
  }

  // MODIFICA LIBRO
  modificaLibro(titolo: string): void {
    this.gestioneLibriService
      .modificaLibro(titolo, this.editoreSelezionato)
      .subscribe({
        next: (risposta) => {
          console.log('Libro modificato con successo:', risposta);
        },
        error: (errore) => {
          console.error('Errore durante la modifica del libro:', errore);
        },
      });
  }

  // CANCELLA LIBRO
  cancellaLibro(): void {
    this.gestioneLibriService.cancellaLibro().subscribe({
      next: (risposta) => {
        console.log('Libro cancellato con successo:', risposta);
      },
      error: (errore) => {
        console.error('Errore durante la cancellazione del libro:', errore);
      },
    });
  }

  // METODO PER RECUPERARE GLI EDITORI DAL DB E INSERIRLI NELL'ARRAY
  private recuperaEditori(): void {
    //GLI EDITORI VENGONO CARICATI SOLO SE L'ARRAY EDITORI è VUOTO, COSì DA METTERSI IN FUNZIONE SOLO QUANDO è DAVVERO NECESSARIO
    if (this.editori.length === 0) {
      this.publishersService.getEditori().subscribe({
        next: (editori) => {
          this.editori = editori;
          console.log('Editori recuperati con successo:', this.editori);
        },
        error: (errore) => {
          console.error('Errore durante il recupero degli editori:', errore);
        },
      });
    }
  }

  //METODO CHE AGGIORNA LA VARIABILE EDITORESELEZIONATO CON L'EDITORE SELEZIONATO DAL DROPDOWN
  selezionaEditore(editore: string): void {
    this.editoreSelezionato = editore;
  }
}
