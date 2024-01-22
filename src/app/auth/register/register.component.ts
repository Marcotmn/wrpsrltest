import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  utente: any = {};

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //REGISTRAZIONE USER
  registrazioneU(form: NgForm): void {
    if (form.valid) {
      this.authSrv
        .registrazioneUser(form.value)
        .pipe()
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error(error);
            if (error.status === 400) {
              alert('Email già registrata');
              this.router.navigate(['/registrazione']);
            }
          },
        });
    }
  }

  //REGISTRAZIONE ADMIN
  registrazioneA(form: NgForm): void {
    if (form.valid) {
      this.authSrv
        .registrazioneAdmin(form.value)
        .pipe()
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error(error);
            if (error.status === 400) {
              alert('Email già registrata');
              this.router.navigate(['/registrazione']);
            }
          },
        });
    }
  }
}
