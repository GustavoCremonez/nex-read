import { Routes } from '@angular/router';
import { LandingPage } from './feature/landing-page/landing-page.component';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: '**', redirectTo: '' }
];
