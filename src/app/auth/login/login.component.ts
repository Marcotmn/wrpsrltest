import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}
  accedi(): void {
    this.authSrv.login(this.email, this.password).subscribe(
      (response) => {
        if (response.accessToken) {
          this.router.navigate(['mylibrary/elenco']);
        }
      },
      (error) => {
        alert('Username o password errati');
      }
    );
  }
}
