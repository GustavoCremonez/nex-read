import { Routes } from '@angular/router';
import { LandingPage } from './feature/landing-page/landing-page.component';
import { Catalog } from './feature/catalog/catalog.component';
import { BookDetails } from './feature/book-details/book-details.component';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'catalog', component: Catalog },
  { path: 'catalog/:id', component: BookDetails },
  { path: '**', redirectTo: '' },
];
