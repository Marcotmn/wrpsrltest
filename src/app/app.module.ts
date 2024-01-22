import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MylibraryComponent } from './components/mylibrary/mylibrary.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './home/home.component';

import { TokenInterceptor } from './auth/token.interceptor';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'registrazione',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'books/allbooks',
    component: BooksComponent,
  },
  {
    path: 'books/:idLibro',
    component: BookDetailsComponent,
  },
  {
    path: 'books/:idLibro',
    component: BookDetailsComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MylibraryComponent,
    NavbarComponent,
    BooksComponent,
    BookDetailsComponent,
    PublishersComponent,
    AdminComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
