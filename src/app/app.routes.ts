import { Routes } from '@angular/router';
import { LandingPage } from './feature/landing-page/landing-page.component';
import { Catalog } from './feature/catalog/catalog.component';
import { BookDetails } from './feature/book-details/book-details.component';
import { Login } from './feature/login/login.component';
import { Register } from './feature/register/register.component';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'catalog', component: Catalog },
  { path: 'catalog/:id', component: BookDetails },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' },
];
