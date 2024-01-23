import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //ALL'APERTURA DELLA PAGINA VERIFICA CHE L'UTENTE SIA AUTENTICATO O MENO
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/mylibrari/elenco']);
    }
  }
}
