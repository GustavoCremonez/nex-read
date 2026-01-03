import { Routes } from '@angular/router';
import { LandingPage } from './feature/landing-page/landing-page.component';
import { Catalog } from './feature/catalog/catalog.component';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'catalog', component: Catalog },
  { path: '**', redirectTo: '' },
];
